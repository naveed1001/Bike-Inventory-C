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

const createBrand = async (name, logo, website) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.execute(
            'INSERT INTO brand (name, logo, website) VALUES (?, ?, ?)',
            [name, logo || null, website || null]
        );
        const [brand] = await connection.execute(
            'SELECT id, name, logo, website, created_at, updated_at, deleted_at FROM brand WHERE id = ?',
            [result.insertId]
        );
        await connection.commit();
        return brand[0];
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const findAllBrands = async () => {
    const [brands] = await pool.execute(
        'SELECT id, name, logo, website, created_at, updated_at, deleted_at FROM brand WHERE deleted_at IS NULL'
    );
    return brands;
};

const findBrandById = async (id) => {
    const [brands] = await pool.execute(
        'SELECT id, name, logo, website, created_at, updated_at, deleted_at FROM brand WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return brands[0] || null;
};

const updateBrand = async (id, name, logo, website) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [existing] = await connection.execute(
            'SELECT id, logo FROM brand WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        if (!existing.length) throw new Error('Not found');

        // If a new logo is provided, delete the old one from S3
        if (logo && existing[0].logo) {
            const oldKey = getS3KeyFromUrl(existing[0].logo);
            await deleteS3File(oldKey);
        }

        await connection.execute(
            'UPDATE brand SET name = ?, logo = ?, website = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [name, logo || null, website || null, id]
        );
        const [updatedBrand] = await connection.execute(
            'SELECT id, name, logo, website, created_at, updated_at, deleted_at FROM brand WHERE id = ?',
            [id]
        );
        await connection.commit();
        return updatedBrand[0];
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const deleteBrand = async (id) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [existing] = await connection.execute(
            'SELECT id, logo FROM brand WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        if (!existing.length) throw new Error('Not found');

        // Delete logo from S3 if it exists
        if (existing[0].logo) {
            const key = getS3KeyFromUrl(existing[0].logo);
            await deleteS3File(key);
        }

        await connection.execute('UPDATE brand SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
        await connection.commit();
        return true;
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = { createBrand, findAllBrands, findBrandById, updateBrand, deleteBrand };