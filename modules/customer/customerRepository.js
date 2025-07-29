const pool = require('../../config/database');

const createCustomer = async (name, email, phone, address, cnic) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (email) {
        const [existingCustomer] = await connection.execute(
            'SELECT id FROM customer WHERE email = ? AND deleted_at IS NULL',
            [email]
        );
        if (existingCustomer.length) throw new Error('Email already in use');
    }

    if (cnic) {
        const [existingCustomer] = await connection.execute(
            'SELECT id FROM customer WHERE cnic = ? AND deleted_at IS NULL',
            [cnic]
        );
        if (existingCustomer.length) throw new Error('CNIC already in use');
    }

    const [result] = await connection.execute(
        'INSERT INTO customer (name, email, phone, address, cnic) VALUES (?, ?, ?, ?, ?)',
        [name, email || null, phone || null, address || null, cnic || null]
    );
    const [customer] = await connection.execute(
        'SELECT id, name, email, phone, address, cnic, created_at, updated_at, deleted_at FROM customer WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return customer[0];
};

const findAllCustomers = async () => {
    const [customers] = await pool.execute(
        'SELECT id, name, email, phone, address, cnic, created_at, updated_at, deleted_at FROM customer WHERE deleted_at IS NULL'
    );
    return customers;
};

const findCustomerById = async (id) => {
    const [customers] = await pool.execute(
        'SELECT id, name, email, phone, address, cnic, created_at, updated_at, deleted_at FROM customer WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return customers[0] || null;
};

const updateCustomer = async (id, name, email, phone, address, cnic) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id, email, cnic FROM customer WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    if (email && email !== existing[0].email) {
        const [otherCustomer] = await connection.execute(
            'SELECT id FROM customer WHERE email = ? AND deleted_at IS NULL AND id != ?',
            [email, id]
        );
        if (otherCustomer.length) throw new Error('Email already in use');
    }

    if (cnic && cnic !== existing[0].cnic) {
        const [otherCustomer] = await connection.execute(
            'SELECT id FROM customer WHERE cnic = ? AND deleted_at IS NULL AND id != ?',
            [cnic, id]
        );
        if (otherCustomer.length) throw new Error('CNIC already in use');
    }

    await connection.execute(
        'UPDATE customer SET name = ?, email = ?, phone = ?, address = ?, cnic = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, email || null, phone || null, address || null, cnic || null, id]
    );
    const [updatedCustomer] = await connection.execute(
        'SELECT id, name, email, phone, address, cnic, created_at, updated_at, deleted_at FROM customer WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedCustomer[0];
};

const deleteCustomer = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM customer WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE customer SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createCustomer, findAllCustomers, findCustomerById, updateCustomer, deleteCustomer };