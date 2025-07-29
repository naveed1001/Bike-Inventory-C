const pool = require('../../config/database');

const createOrganization = async (name, logo, website, address, vendorId, adminId, bankingId) => {
    const connection = await pool.getConnection();
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
    connection.release();
    return organization[0];
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
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE organization SET name = ?, logo = ?, website = ?, address = ?, vendor_id = ?, admin_id = ?, banking_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, logo || null, website || null, address || null, vendorId || null, adminId || null, bankingId || null, id]
    );
    const [updatedOrganization] = await connection.execute(
        'SELECT id, name, logo, website, address, vendor_id, admin_id, banking_id, created_at, updated_at, deleted_at FROM organization WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedOrganization[0];
};

const deleteOrganization = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE organization SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createOrganization, findAllOrganizations, findOrganizationById, updateOrganization, deleteOrganization };