const pool = require('../../config/database');

const createStatus = async (name, value) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.execute(
        'INSERT INTO status (name, value) VALUES (?, ?)',
        [name, value]
    );
    const [status] = await connection.execute(
        'SELECT id, name, value, created_at, updated_at, deleted_at FROM status WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return status[0];
};

const findAllStatuses = async () => {
    const [statuses] = await pool.execute(
        'SELECT id, name, value, created_at, updated_at, deleted_at FROM status WHERE deleted_at IS NULL'
    );
    return statuses;
};

const findStatusById = async (id) => {
    const [statuses] = await pool.execute(
        'SELECT id, name, value, created_at, updated_at, deleted_at FROM status WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return statuses[0] || null;
};

const updateStatus = async (id, name, value) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM status WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE status SET name = ?, value = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, value, id]
    );
    const [updatedStatus] = await connection.execute(
        'SELECT id, name, value, created_at, updated_at, deleted_at FROM status WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedStatus[0];
};

const deleteStatus = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM status WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE status SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createStatus, findAllStatuses, findStatusById, updateStatus, deleteStatus };