const pool = require('../../config/database');

const createShipment = async (shippingAgentId, itemId, warehouseId, destination, statusId, riderName, riderNumber) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (shippingAgentId) {
        const [agent] = await connection.execute(
            'SELECT id FROM shipping_agent WHERE id = ? AND deleted_at IS NULL',
            [shippingAgentId]
        );
        if (!agent.length) throw new Error('Shipping agent not found');
    }

    if (itemId) {
        const [item] = await connection.execute(
            'SELECT id FROM item WHERE id = ? AND deleted_at IS NULL',
            [itemId]
        );
        if (!item.length) throw new Error('Item not found');
    }

    if (warehouseId) {
        const [warehouse] = await connection.execute(
            'SELECT id FROM warehouse WHERE id = ? AND deleted_at IS NULL',
            [warehouseId]
        );
        if (!warehouse.length) throw new Error('Warehouse not found');
    }

    if (statusId) {
        const [status] = await connection.execute(
            'SELECT id FROM status WHERE id = ? AND deleted_at IS NULL',
            [statusId]
        );
        if (!status.length) throw new Error('Status not found');
    }

    const [result] = await connection.execute(
        'INSERT INTO shipment (shipping_agent_id, item_id, warehouse_id, destination, status_id, rider_name, rider_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [shippingAgentId || null, itemId || null, warehouseId || null, destination || null, statusId || null, riderName || null, riderNumber || null]
    );
    const [shipment] = await connection.execute(
        'SELECT id, shipping_agent_id, item_id, warehouse_id, destination, status_id, rider_name, rider_number, created_at, updated_at, deleted_at FROM shipment WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return shipment[0];
};

const findAllShipments = async () => {
    const [shipments] = await pool.execute(
        'SELECT id, shipping_agent_id, item_id, warehouse_id, destination, status_id, rider_name, rider_number, created_at, updated_at, deleted_at FROM shipment WHERE deleted_at IS NULL'
    );
    return shipments;
};

const findShipmentById = async (id) => {
    const [shipments] = await pool.execute(
        'SELECT id, shipping_agent_id, item_id, warehouse_id, destination, status_id, rider_name, rider_number, created_at, updated_at, deleted_at FROM shipment WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return shipments[0] || null;
};

const updateShipment = async (id, shippingAgentId, itemId, warehouseId, destination, statusId, riderName, riderNumber) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id FROM shipment WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    if (shippingAgentId) {
        const [agent] = await connection.execute(
            'SELECT id FROM shipping_agent WHERE id = ? AND deleted_at IS NULL',
            [shippingAgentId]
        );
        if (!agent.length) throw new Error('Shipping agent not found');
    }

    if (itemId) {
        const [item] = await connection.execute(
            'SELECT id FROM item WHERE id = ? AND deleted_at IS NULL',
            [itemId]
        );
        if (!item.length) throw new Error('Item not found');
    }

    if (warehouseId) {
        const [warehouse] = await connection.execute(
            'SELECT id FROM warehouse WHERE id = ? AND deleted_at IS NULL',
            [warehouseId]
        );
        if (!warehouse.length) throw new Error('Warehouse not found');
    }

    if (statusId) {
        const [status] = await connection.execute(
        'SELECT id FROM status WHERE id = ? AND deleted_at IS NULL',
            [statusId]
        );
        if (!status.length) throw new Error('Status not found');
    }

    await connection.execute(
        'UPDATE shipment SET shipping_agent_id = ?, item_id = ?, warehouse_id = ?, destination = ?, status_id = ?, rider_name = ?, rider_number = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [shippingAgentId || null, itemId || null, warehouseId || null, destination || null, statusId || null, riderName || null, riderNumber || null, id]
    );
    const [updatedShipment] = await connection.execute(
        'SELECT id, shipping_agent_id, item_id, warehouse_id, destination, status_id, rider_name, rider_number, created_at, updated_at, deleted_at FROM shipment WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedShipment[0];
};

const deleteShipment = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM shipment WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE shipment SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createShipment, findAllShipments, findShipmentById, updateShipment, deleteShipment };