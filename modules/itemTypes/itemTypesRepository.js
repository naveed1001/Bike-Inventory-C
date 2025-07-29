const pool = require('../../config/database');

const createItemType = async (name, description) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.execute(
        'INSERT INTO item_types (name, description) VALUES (?, ?)',
        [name, description || null]
    );
    const [itemType] = await connection.execute(
        'SELECT id, name, description, created_at, updated_at, deleted_at FROM item_types WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return itemType[0];
};

const findAllItemTypes = async () => {
    const [itemTypes] = await pool.execute(
        'SELECT id, name, description, created_at, updated_at, deleted_at FROM item_types WHERE deleted_at IS NULL'
    );
    return itemTypes;
};

const findItemTypeById = async (id) => {
    const [itemTypes] = await pool.execute(
        'SELECT id, name, description, created_at, updated_at, deleted_at FROM item_types WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return itemTypes[0] || null;
};

const updateItemType = async (id, name, description) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM item_types WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE item_types SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, description || null, id]
    );
    const [updatedItemType] = await connection.execute(
        'SELECT id, name, description, created_at, updated_at, deleted_at FROM item_types WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedItemType[0];
};

const deleteItemType = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM item_types WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE item_types SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createItemType, findAllItemTypes, findItemTypeById, updateItemType, deleteItemType };