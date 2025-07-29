const pool = require('../../config/database');

const createVendor = async (name, address, phone, email, bankingId) => {
    const connection = await pool.getConnection();
    
    await connection.beginTransaction();
    const [bankingCheck] = await connection.execute(
        'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
        [bankingId]
    );
    if (!bankingCheck.length) throw new Error('Invalid banking_id');

    const [result] = await connection.execute(
        'INSERT INTO vendor (name, address, phone, email, banking_id) VALUES (?, ?, ?, ?, ?)',
        [name, address, phone, email, bankingId]
    );
    const [vendor] = await connection.execute(
        'SELECT id, name, address, phone, email, banking_id, created_at, updated_at, deleted_at FROM vendor WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    
    connection.release();
    return vendor[0];
};

const findAllVendors = async () => {
    const [vendors] = await pool.execute(
        'SELECT id, name, address, phone, email, banking_id, created_at, updated_at, deleted_at FROM vendor WHERE deleted_at IS NULL'
    );
    return vendors;
};

const findVendorById = async (id) => {
    const [vendors] = await pool.execute(
        'SELECT id, name, address, phone, email, banking_id, created_at, updated_at, deleted_at FROM vendor WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return vendors[0] || null;
};

const updateVendor = async (id, name, address, phone, email, bankingId) => {
    const connection = await pool.getConnection();
    
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM vendor WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    const [bankingCheck] = await connection.execute(
        'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
        [bankingId]
    );
    if (!bankingCheck.length) throw new Error('Invalid banking_id');

    await connection.execute(
        'UPDATE vendor SET name = ?, address = ?, phone = ?, email = ?, banking_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, address, phone, email, bankingId, id]
    );
    const [updatedVendor] = await connection.execute(
        'SELECT id, name, address, phone, email, banking_id, created_at, updated_at, deleted_at FROM vendor WHERE id = ?',
        [id]
    );
    await connection.commit();
    
    connection.release();
    return updatedVendor[0];
};

const deleteVendor = async (id) => {
    const connection = await pool.getConnection();
    
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM vendor WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE vendor SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    
    connection.release();
    return true;
};

module.exports = { createVendor, findAllVendors, findVendorById, updateVendor, deleteVendor };