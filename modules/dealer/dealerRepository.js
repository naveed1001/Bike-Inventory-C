const pool = require('../../config/database');

const createDealer = async (name, phone, email, address, brandId, bankingId, organizationId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (brandId) {
        const [brand] = await connection.execute(
            'SELECT id FROM brand WHERE id = ? AND deleted_at IS NULL',
            [brandId]
        );
        if (!brand.length) throw new Error('Brand not found');
    }

    if (bankingId) {
        const [banking] = await connection.execute(
            'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
            [bankingId]
        );
        if (!banking.length) throw new Error('Banking details not found');
    }

    if (organizationId) {
        const [organization] = await connection.execute(
            'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
            [organizationId]
        );
        if (!organization.length) throw new Error('Organization not found');
    }

    if (email) {
        const [existingDealer] = await connection.execute(
            'SELECT id FROM dealer WHERE email = ? AND deleted_at IS NULL',
            [email]
        );
        if (existingDealer.length) throw new Error('Email already in use');
    }

    const [result] = await connection.execute(
        'INSERT INTO dealer (name, phone, email, address, brand_id, banking_id, organization_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, phone || null, email || null, address || null, brandId || null, bankingId || null, organizationId || null]
    );
    const [dealer] = await connection.execute(
        'SELECT id, name, phone, email, address, brand_id, banking_id, organization_id, created_at, updated_at, deleted_at FROM dealer WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return dealer[0];
};

const findAllDealers = async () => {
    const [dealers] = await pool.execute(
        'SELECT id, name, phone, email, address, brand_id, banking_id, organization_id, created_at, updated_at, deleted_at FROM dealer WHERE deleted_at IS NULL'
    );
    return dealers;
};

const findDealerById = async (id) => {
    const [dealers] = await pool.execute(
        'SELECT id, name, phone, email, address, brand_id, banking_id, organization_id, created_at, updated_at, deleted_at FROM dealer WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return dealers[0] || null;
};

const updateDealer = async (id, name, phone, email, address, brandId, bankingId, organizationId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id, email FROM dealer WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    if (brandId) {
        const [brand] = await connection.execute(
            'SELECT id FROM brand WHERE id = ? AND deleted_at IS NULL',
            [brandId]
        );
        if (!brand.length) throw new Error('Brand not found');
    }

    if (bankingId) {
        const [banking] = await connection.execute(
            'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
            [bankingId]
        );
        if (!banking.length) throw new Error('Banking details not found');
    }

    if (organizationId) {
        const [organization] = await connection.execute(
            'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
            [organizationId]
        );
        if (!organization.length) throw new Error('Organization not found');
    }

    if (email && email !== existing[0].email) {
        const [otherDealer] = await connection.execute(
            'SELECT id FROM dealer WHERE email = ? AND deleted_at IS NULL AND id != ?',
            [email, id]
        );
        if (otherDealer.length) throw new Error('Email already in use');
    }

    await connection.execute(
        'UPDATE dealer SET name = ?, phone = ?, email = ?, address = ?, brand_id = ?, banking_id = ?, organization_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, phone || null, email || null, address || null, brandId || null, bankingId || null, organizationId || null, id]
    );
    const [updatedDealer] = await connection.execute(
        'SELECT id, name, phone, email, address, brand_id, banking_id, organization_id, created_at, updated_at, deleted_at FROM dealer WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedDealer[0];
};

const deleteDealer = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM dealer WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE dealer SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createDealer, findAllDealers, findDealerById, updateDealer, deleteDealer };