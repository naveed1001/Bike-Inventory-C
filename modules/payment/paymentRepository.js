const pool = require('../../config/database');

const createPayment = async (nature, type, amount, payee, beneficiary) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.execute(
        'INSERT INTO payment (nature, type, amount, payee, beneficiary) VALUES (?, ?, ?, ?, ?)',
        [nature, type, amount, payee, beneficiary]
    );
    const [payment] = await connection.execute(
        'SELECT id, nature, type, amount, payee, beneficiary, created_at, updated_at, deleted_at FROM payment WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return payment[0];
};

const findAllPayments = async () => {
    const [payments] = await pool.execute(
        'SELECT id, nature, type, amount, payee, beneficiary, created_at, updated_at, deleted_at FROM payment WHERE deleted_at IS NULL'
    );
    return payments;
};

const findPaymentById = async (id) => {
    const [payments] = await pool.execute(
        'SELECT id, nature, type, amount, payee, beneficiary, created_at, updated_at, deleted_at FROM payment WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return payments[0] || null;
};

const updatePayment = async (id, nature, type, amount, payee, beneficiary) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM payment WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE payment SET nature = ?, type = ?, amount = ?, payee = ?, beneficiary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [nature, type, amount, payee, beneficiary, id]
    );
    const [updatedPayment] = await connection.execute(
        'SELECT id, nature, type, amount, payee, beneficiary, created_at, updated_at, deleted_at FROM payment WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedPayment[0];
};

const deletePayment = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM payment WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE payment SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createPayment, findAllPayments, findPaymentById, updatePayment, deletePayment };