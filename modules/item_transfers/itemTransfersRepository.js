const pool = require('../../config/database');

const createItemTransfer = async (itemId, fromWarehouseId, toWarehouseId, quantity, transferredBy, remarks) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [item] = await connection.execute(
        'SELECT id FROM item WHERE id = ? AND deleted_at IS NULL',
        [itemId]
    );
    if (!item.length) throw new Error('Item not found');

    const [fromWarehouse] = await connection.execute(
        'SELECT id FROM warehouse WHERE id = ? AND deleted_at IS NULL',
        [fromWarehouseId]
    );
    if (!fromWarehouse.length) throw new Error('From warehouse not found');

    const [toWarehouse] = await connection.execute(
        'SELECT id FROM warehouse WHERE id = ? AND deleted_at IS NULL',
        [toWarehouseId]
    );
    if (!toWarehouse.length) throw new Error('To warehouse not found');

    if (transferredBy) {
        const [user] = await connection.execute(
            'SELECT id FROM users WHERE id = ? AND deleted_at IS NULL',
            [transferredBy]
        );
        if (!user.length) throw new Error('User not found');
    }

    const [result] = await connection.execute(
        'INSERT INTO item_transfers (item_id, from_warehouse_id, to_warehouse_id, quantity, transferred_by, remarks) VALUES (?, ?, ?, ?, ?, ?)',
        [itemId, fromWarehouseId, toWarehouseId, quantity, transferredBy || null, remarks || null]
    );
    const [itemTransfer] = await connection.execute(
        'SELECT id, item_id, from_warehouse_id, to_warehouse_id, quantity, transferred_by, transferred_at, remarks, created_at, updated_at, deleted_at FROM item_transfers WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return itemTransfer[0];
};

const findAllItemTransfers = async () => {
    const [itemTransfers] = await pool.execute(
        'SELECT id, item_id, from_warehouse_id, to_warehouse_id, quantity, transferred_by, transferred_at, remarks, created_at, updated_at, deleted_at FROM item_transfers WHERE deleted_at IS NULL'
    );
    return itemTransfers;
};

const findItemTransferById = async (id) => {
    const [itemTransfers] = await pool.execute(
        'SELECT id, item_id, from_warehouse_id, to_warehouse_id, quantity, transferred_by, transferred_at, remarks, created_at, updated_at, deleted_at FROM item_transfers WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return itemTransfers[0] || null;
};

const updateItemTransfer = async (id, itemId, fromWarehouseId, toWarehouseId, quantity, transferredBy, remarks) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id FROM item_transfers WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    const [item] = await connection.execute(
        'SELECT id FROM item WHERE id = ? AND deleted_at IS NULL',
        [itemId]
    );
    if (!item.length) throw new Error('Item not found');

    const [fromWarehouse] = await connection.execute(
        'SELECT id FROM warehouse WHERE id = ? AND deleted_at IS NULL',
        [fromWarehouseId]
    );
    if (!fromWarehouse.length) throw new Error('From warehouse not found');

    const [toWarehouse] = await connection.execute(
        'SELECT id FROM warehouse WHERE id = ? AND deleted_at IS NULL',
        [toWarehouseId]
    );
    if (!toWarehouse.length) throw new Error('To warehouse not found');

    if (transferredBy) {
        const [user] = await connection.execute(
            'SELECT id FROM users WHERE id = ? AND deleted_at IS NULL',
            [transferredBy]
        );
        if (!user.length) throw new Error('User not found');
    }

    await connection.execute(
        'UPDATE item_transfers SET item_id = ?, from_warehouse_id = ?, to_warehouse_id = ?, quantity = ?, transferred_by = ?, remarks = ?, transferred_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [itemId, fromWarehouseId, toWarehouseId, quantity, transferredBy || null, remarks || null, id]
    );
    const [updatedItemTransfer] = await connection.execute(
        'SELECT id, item_id, from_warehouse_id, to_warehouse_id, quantity, transferred_by, transferred_at, remarks, created_at, updated_at, deleted_at FROM item_transfers WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedItemTransfer[0];
};

const deleteItemTransfer = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id FROM item_transfers WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    await connection.execute('UPDATE item_transfers SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createItemTransfer, findAllItemTransfers, findItemTransferById, updateItemTransfer, deleteItemTransfer };