const pool = require('../../config/database');

const createDealership = async (name, phone, address, email, website, bankingId, dealerId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (bankingId) {
        const [banking] = await connection.execute(
            'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
            [bankingId]
        );
        if (!banking.length) throw new Error('Banking details not found');
    }

    if (dealerId) {
        const [dealer] = await connection.execute(
            'SELECT id FROM dealer WHERE id = ? AND deleted_at IS NULL',
            [dealerId]
        );
        if (!dealer.length) throw new Error('Dealer not found');
    }

    if (email) {
        const [existingDealership] = await connection.execute(
            'SELECT id FROM dealership WHERE email = ? AND deleted_at IS NULL',
            [email]
        );
        if (existingDealership.length) throw new Error('Email already in use');
    }

    const [result] = await connection.execute(
        'INSERT INTO dealership (name, phone, address, email, website, banking_id, dealer_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, phone || null, address || null, email || null, website || null, bankingId || null, dealerId || null]
    );
    const [dealership] = await connection.execute(
        'SELECT id, name, phone, address, email, website, banking_id, dealer_id, created_at, updated_at, deleted_at FROM dealership WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return dealership[0];
};

const findAllDealerships = async () => {
    const [dealerships] = await pool.execute(
        'SELECT id, name, phone, address, email, website, banking_id, dealer_id, created_at, updated_at, deleted_at FROM dealership WHERE deleted_at IS NULL'
    );
    return dealerships;
};

const findDealershipById = async (id) => {
    const [dealerships] = await pool.execute(
        'SELECT id, name, phone, address, email, website, banking_id, dealer_id, created_at, updated_at, deleted_at FROM dealership WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return dealerships[0] || null;
};

const updateDealership = async (id, name, phone, address, email, website, bankingId, dealerId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id, email FROM dealership WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    if (bankingId) {
        const [banking] = await connection.execute(
            'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
            [bankingId]
        );
        if (!banking.length) throw new Error('Banking details not found');
    }

    if (dealerId) {
        const [dealer] = await connection.execute(
            'SELECT id FROM dealer WHERE id = ? AND deleted_at IS NULL',
            [dealerId]
        );
        if (!dealer.length) throw new Error('Dealer not found');
    }

    if (email && email !== existing[0].email) {
        const [otherDealership] = await connection.execute(
            'SELECT id FROM dealership WHERE email = ? AND deleted_at IS NULL AND id != ?',
            [email, id]
        );
        if (otherDealership.length) throw new Error('Email already in use');
    }

    await connection.execute(
        'UPDATE dealership SET name = ?, phone = ?, address = ?, email = ?, website = ?, banking_id = ?, dealer_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, phone || null, address || null, email || null, website || null, bankingId || null, dealerId || null, id]
    );
    const [updatedDealership] = await connection.execute(
        'SELECT id, name, phone, address, email, website, banking_id, dealer_id, created_at, updated_at, deleted_at FROM dealership WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedDealership[0];
};

const deleteDealership = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM dealership WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE dealership SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createDealership, findAllDealerships, findDealershipById, updateDealership, deleteDealership };