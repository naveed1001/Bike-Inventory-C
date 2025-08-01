const pool = require('../../config/database');
// Import required AWS SDK classes
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// 🔧 Initialize the AWS S3 client using credentials from environment variables
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

/**
 * 🧰 Extracts the object key (i.e., path inside the bucket) from a full S3 URL.
 * 
 * url - The full S3 URL.
 * @returns {string|null} - The extracted key or null if URL is invalid.
 * 
 * Example:
 * Input: https://my-bucket.s3.amazonaws.com/folder/image.jpg
 * Output: folder/image.jpg
 */
const getS3KeyFromUrl = (url) => {
    if (!url) return null;
    const urlObj = new URL(url); // Parse the URL
    return decodeURIComponent(urlObj.pathname.substring(1));
};

/**
 * 🗑️ Deletes an object from AWS S3 using its key.
 * key - The S3 object key (path inside bucket).
 */
const deleteS3File = async (key) => {
    if (!key) return; // Skip if key is invalid
    try {
        // Create a delete command with target bucket and key
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key                           // Object key to delete
        });

        // Send the command to S3
        await s3.send(command);
    } catch (error) {
        console.error(`Failed to delete S3 file ${key}:`, error);
        throw new Error('Failed to delete file from S3');
    }
};

const createOrganization = async (name, logo, website, address, vendorId, adminId, bankingId) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.execute(
            'INSERT INTO organization (name, logo, website, address, vendor_id, admin_id, banking_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, logo || null, website || null, address || null, vendorId || null, adminId || null, bankingId || null]
        );
        const [organization] = await connection.execute(
            'SELECT id, name, logo, website, address, vendor_id, admin_id, banking_id, created_at, updated_at, deleted_at FROM organization WHERE id = ?',
            [result.insertId]
        );
        await connection.commit();
        return organization[0];
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const findAllOrganizations = async () => {
    const [organizations] = await pool.execute(
        'SELECT id, name, logo, website, address, vendor_id, admin_id, banking_id, created_at, updated_at, deleted_at FROM organization WHERE deleted_at IS NULL'
    );
    return organizations;
};

const findOrganizationById = async (id) => {
    const [organizations] = await pool.execute(
        'SELECT id, name, logo, website, address, vendor_id, admin_id, banking_id, created_at, updated_at, deleted_at FROM organization WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return organizations[0] || null;
};

const updateOrganization = async (id, name, logo, website, address, vendorId, adminId, bankingId) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [existing] = await connection.execute(
            'SELECT id, logo FROM organization WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        if (!existing.length) throw new Error('Not found');

        // If a new logo is provided, delete the old one from S3
        if (logo && existing[0].logo) {
            const oldKey = getS3KeyFromUrl(existing[0].logo);
            await deleteS3File(oldKey);
        }

        await connection.execute(
            'UPDATE organization SET name = ?, logo = ?, website = ?, address = ?, vendor_id = ?, admin_id = ?, banking_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [name, logo || null, website || null, address || null, vendorId || null, adminId || null, bankingId || null, id]
        );
        const [updatedOrganization] = await connection.execute(
            'SELECT id, name, logo, website, address, vendor_id, admin_id, banking_id, created_at, updated_at, deleted_at FROM organization WHERE id = ?',
            [id]
        );
        await connection.commit();
        return updatedOrganization[0];
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const deleteOrganization = async (id) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [existing] = await connection.execute(
            'SELECT id, logo FROM organization WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        if (!existing.length) throw new Error('Not found');

        // Delete logo from S3 if it exists
        if (existing[0].logo) {
            const key = getS3KeyFromUrl(existing[0].logo);
            await deleteS3File(key);
        }

        await connection.execute('UPDATE organization SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
        await connection.commit();
        return true;
    } catch (error) {
        if (connection) await connection.rollback();
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = { createOrganization, findAllOrganizations, findOrganizationById, updateOrganization, deleteOrganization };