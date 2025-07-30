const pool = require('../../config/database');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// Initialize S3 client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Utility function to extract S3 key from URL
const getS3KeyFromUrl = (url) => {
    if (!url) return null;
    const urlObj = new URL(url);
    return decodeURIComponent(urlObj.pathname.substring(1)); // Remove leading '/' from pathname
};

// Utility function to delete a file from S3
const deleteS3File = async (key) => {
    if (!key) return;
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        });
        await s3.send(command);
    } catch (error) {
        console.error(`Failed to delete S3 file ${key}:`, error);
        throw new Error('Failed to delete file from S3');
    }
};

const createInstrument = async (number, amount, date, picture) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.execute(
            'INSERT INTO instruments (number, amount, date, picture) VALUES (?, ?, ?, ?)',
            [number, amount, date, picture || null]
        );
        const [instrument] = await connection.execute(
            'SELECT id, number, amount, date, picture, created_at, updated_at, deleted_at FROM instruments WHERE id = ?',
            [result.insertId]
        );
        await connection.commit();
        return instrument[0];
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const findAllInstruments = async () => {
    const [instruments] = await pool.execute(
        'SELECT id, number, amount, date, picture, created_at, updated_at, deleted_at FROM instruments WHERE deleted_at IS NULL'
    );
    return instruments;
};

const findInstrumentById = async (id) => {
    const [instruments] = await pool.execute(
        'SELECT id, number, amount, date, picture, created_at, updated_at, deleted_at FROM instruments WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return instruments[0] || null;
};

const updateInstrument = async (id, number, amount, date, picture) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [existing] = await connection.execute(
            'SELECT id, picture FROM instruments WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        if (!existing.length) throw new Error('Not found');

        // If a new picture is provided, delete the old one from S3
        if (picture && existing[0].picture) {
            const oldKey = getS3KeyFromUrl(existing[0].picture);
            await deleteS3File(oldKey);
        }

        await connection.execute(
            'UPDATE instruments SET number = ?, amount = ?, date = ?, picture = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [number, amount, date, picture || null, id]
        );
        const [updatedInstrument] = await connection.execute(
            'SELECT id, number, amount, date, picture, created_at, updated_at, deleted_at FROM instruments WHERE id = ?',
            [id]
        );
        await connection.commit();
        return updatedInstrument[0];
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const deleteInstrument = async (id) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [existing] = await connection.execute(
            'SELECT id, picture FROM instruments WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        if (!existing.length) throw new Error('Not found');

        // Delete picture from S3 if it exists
        if (existing[0].picture) {
            const key = getS3KeyFromUrl(existing[0].picture);
            await deleteS3File(key);
        }

        await connection.execute('UPDATE instruments SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
        await connection.commit();
        return true;
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = { createInstrument, findAllInstruments, findInstrumentById, updateInstrument, deleteInstrument };