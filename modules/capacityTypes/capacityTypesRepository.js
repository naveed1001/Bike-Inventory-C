const pool = require('../../config/database');

const createCapacityType = async (itemTypeId, itemCapacity, warehouseId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.execute(
        'INSERT INTO capacity_types (item_type_id, item_capacity, warehouse_id) VALUES (?, ?, ?)',
        [itemTypeId, itemCapacity, warehouseId]
    );
    const [capacityType] = await connection.execute(
        'SELECT id, item_type_id, item_capacity, warehouse_id, created_at, updated_at, deleted_at FROM capacity_types WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return capacityType[0];
};

const findAllCapacityTypes = async () => {
    const [capacityTypes] = await pool.execute(
        'SELECT id, item_type_id, item_capacity, warehouse_id, created_at, updated_at, deleted_at FROM capacity_types WHERE deleted_at IS NULL'
    );
    return capacityTypes;
};

const findCapacityTypeById = async (id) => {
    const [capacityTypes] = await pool.execute(
        'SELECT id, item_type_id, item_capacity, warehouse_id, created_at, updated_at, deleted_at FROM capacity_types WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return capacityTypes[0] || null;
};

const updateCapacityType = async (id, itemTypeId, itemCapacity, warehouseId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM capacity_types WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE capacity_types SET item_type_id = ?, item_capacity = ?, warehouse_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [itemTypeId, itemCapacity, warehouseId, id]
    );
    const [updatedCapacityType] = await connection.execute(
        'SELECT id, item_type_id, item_capacity, warehouse_id, created_at, updated_at, deleted_at FROM capacity_types WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedCapacityType[0];
};

const deleteCapacityType = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM capacity_types WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE capacity_types SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createCapacityType, findAllCapacityTypes, findCapacityTypeById, updateCapacityType, deleteCapacityType };