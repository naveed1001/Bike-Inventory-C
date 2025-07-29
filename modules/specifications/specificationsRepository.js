const pool = require('../../config/database');

const createSpecification = async (name, value, itemId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.execute(
        'INSERT INTO specifications (name, value, item_id) VALUES (?, ?, ?)',
        [name, value, itemId]
    );
    const [specification] = await connection.execute(
        'SELECT id, name, value, item_id, created_at, updated_at, deleted_at FROM specifications WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return specification[0];
};

const findAllSpecifications = async () => {
    const [specifications] = await pool.execute(
        'SELECT id, name, value, item_id, created_at, updated_at, deleted_at FROM specifications WHERE deleted_at IS NULL'
    );
    return specifications;
};

const findSpecificationById = async (id) => {
    const [specifications] = await pool.execute(
        'SELECT id, name, value, item_id, created_at, updated_at, deleted_at FROM specifications WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return specifications[0] || null;
};

const updateSpecification = async (id, name, value, itemId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM specifications WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE specifications SET name = ?, value = ?, item_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, value, itemId, id]
    );
    const [updatedSpecification] = await connection.execute(
        'SELECT id, name, value, item_id, created_at, updated_at, deleted_at FROM specifications WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedSpecification[0];
};

const deleteSpecification = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM specifications WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE specifications SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createSpecification, findAllSpecifications, findSpecificationById, updateSpecification, deleteSpecification };