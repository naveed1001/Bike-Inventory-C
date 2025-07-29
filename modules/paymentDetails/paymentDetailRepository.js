const pool = require('../../config/database');

const createPaymentDetail = async (paymentId, installmentId, type, advanceAmount, dueAmount, dueDate, paidDate, remarks) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [payment] = await connection.execute(
        'SELECT id FROM payment WHERE id = ? AND deleted_at IS NULL',
        [paymentId]
    );
    if (!payment.length) throw new Error('Payment not found');

    if (installmentId) {
        const [installment] = await connection.execute(
            'SELECT id FROM installment WHERE id = ? AND deleted_at IS NULL',
            [installmentId]
        );
        if (!installment.length) throw new Error('Installment not found');
    }

    const [result] = await connection.execute(
        'INSERT INTO payment_detail (payment_id, installment_id, type, advance_amount, due_amount, due_date, paid_date, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [paymentId, installmentId || null, type, advanceAmount, dueAmount, dueDate || null, paidDate || null, remarks || null]
    );
    const [paymentDetail] = await connection.execute(
        'SELECT id, payment_id, installment_id, type, advance_amount, due_amount, due_date, paid_date, remarks, created_at, updated_at, deleted_at FROM payment_detail WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return paymentDetail[0];
};

const findAllPaymentDetails = async () => {
    const [paymentDetails] = await pool.execute(
        'SELECT id, payment_id, installment_id, type, advance_amount, due_amount, due_date, paid_date, remarks, created_at, updated_at, deleted_at FROM payment_detail WHERE deleted_at IS NULL'
    );
    return paymentDetails;
};

const findPaymentDetailById = async (id) => {
    const [paymentDetails] = await pool.execute(
        'SELECT id, payment_id, installment_id, type, advance_amount, due_amount, due_date, paid_date, remarks, created_at, updated_at, deleted_at FROM payment_detail WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return paymentDetails[0] || null;
};

const updatePaymentDetail = async (id, paymentId, installmentId, type, advanceAmount, dueAmount, dueDate, paidDate, remarks) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id FROM payment_detail WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    const [payment] = await connection.execute(
        'SELECT id FROM payment WHERE id = ? AND deleted_at IS NULL',
        [paymentId]
    );
    if (!payment.length) throw new Error('Payment not found');

    if (installmentId) {
        const [installment] = await connection.execute(
            'SELECT id FROM installment WHERE id = ? AND deleted_at IS NULL',
            [installmentId]
        );
        if (!installment.length) throw new Error('Installment not found');
    }

    await connection.execute(
        'UPDATE payment_detail SET payment_id = ?, installment_id = ?, type = ?, advance_amount = ?, due_amount = ?, due_date = ?, paid_date = ?, remarks = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [paymentId, installmentId || null, type, advanceAmount, dueAmount, dueDate || null, paidDate || null, remarks || null, id]
    );
    const [updatedPaymentDetail] = await connection.execute(
        'SELECT id, payment_id, installment_id, type, advance_amount, due_amount, due_date, paid_date, remarks, created_at, updated_at, deleted_at FROM payment_detail WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedPaymentDetail[0];
};

const deletePaymentDetail = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM payment_detail WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE payment_detail SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createPaymentDetail, findAllPaymentDetails, findPaymentDetailById, updatePaymentDetail, deletePaymentDetail };