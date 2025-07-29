const pool = require('../../config/database');

const createWarehouse = async (name, organizationId, address, area, location) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (organizationId) {
        const [organization] = await connection.execute(
            'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
            [organizationId]
        );
        if (!organization.length) throw new Error('Organization not found');
    }

    const [result] = await connection.execute(
        'INSERT INTO warehouse (name, organization_id, address, area, location) VALUES (?, ?, ?, ?, ?)',
        [name, organizationId || null, address || null, area || null, location || null]
    );
    const [warehouse] = await connection.execute(
        'SELECT id, name, organization_id, address, area, location, created_at, updated_at, deleted_at FROM warehouse WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return warehouse[0];
};

const findAllWarehouses = async () => {
    const [warehouses] = await pool.execute(
        'SELECT id, name, organization_id, address, area, location, created_at, updated_at, deleted_at FROM warehouse WHERE deleted_at IS NULL'
    );
    return warehouses;
};

const findWarehouseById = async (id) => {
    const [warehouses] = await pool.execute(
        'SELECT id, name, organization_id, address, area, location, created_at, updated_at, deleted_at FROM warehouse WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return warehouses[0] || null;
};

const updateWarehouse = async (id, name, organizationId, address, area, location) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id FROM warehouse WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    if (organizationId) {
        const [organization] = await connection.execute(
            'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
            [organizationId]
        );
        if (!organization.length) throw new Error('Organization not found');
    }

    await connection.execute(
        'UPDATE warehouse SET name = ?, organization_id = ?, address = ?, area = ?, location = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, organizationId || null, address || null, area || null, location || null, id]
    );
    const [updatedWarehouse] = await connection.execute(
        'SELECT id, name, organization_id, address, area, location, created_at, updated_at, deleted_at FROM warehouse WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedWarehouse[0];
};

const deleteWarehouse = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id FROM warehouse WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    await connection.execute('UPDATE warehouse SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createWarehouse, findAllWarehouses, findWarehouseById, updateWarehouse, deleteWarehouse };