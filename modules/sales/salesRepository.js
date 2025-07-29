const pool = require('../../config/database');

const createSale = async (itemId, customerId, dealerId, paymentId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (itemId) {
        const [item] = await connection.execute(
            'SELECT id FROM item WHERE id = ? AND deleted_at IS NULL',
            [itemId]
        );
        if (!item.length) throw new Error('Item not found');
    }

    if (customerId) {
        const [customer] = await connection.execute(
            'SELECT id FROM customer WHERE id = ? AND deleted_at IS NULL',
            [customerId]
        );
        if (!customer.length) throw new Error('Customer not found');
    }

    if (dealerId) {
        const [dealer] = await connection.execute(
            'SELECT id FROM dealer WHERE id = ? AND deleted_at IS NULL',
            [dealerId]
        );
        if (!dealer.length) throw new Error('Dealer not found');
    }

    if (paymentId) {
        const [payment] = await connection.execute(
            'SELECT id FROM payment WHERE id = ? AND deleted_at IS NULL',
            [paymentId]
        );
        if (!payment.length) throw new Error('Payment not found');
    }

    const [result] = await connection.execute(
        'INSERT INTO sales (item_id, customer_id, dealer_id, payment_id) VALUES (?, ?, ?, ?)',
        [itemId || null, customerId || null, dealerId || null, paymentId || null]
    );
    const [sale] = await connection.execute(
        'SELECT id, item_id, customer_id, dealer_id, payment_id, created_at, updated_at, deleted_at FROM sales WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return sale[0];
};

const findAllSales = async () => {
    const [sales] = await pool.execute(
        'SELECT id, item_id, customer_id, dealer_id, payment_id, created_at, updated_at, deleted_at FROM sales WHERE deleted_at IS NULL'
    );
    return sales;
};

const findSaleById = async (id) => {
    const [sales] = await pool.execute(
        'SELECT id, item_id, customer_id, dealer_id, payment_id, created_at, updated_at, deleted_at FROM sales WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return sales[0] || null;
};

const updateSale = async (id, itemId, customerId, dealerId, paymentId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id FROM sales WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    if (itemId) {
        const [item] = await connection.execute(
            'SELECT id FROM item WHERE id = ? AND deleted_at IS NULL',
            [itemId]
        );
        if (!item.length) throw new Error('Item not found');
    }

    if (customerId) {
        const [customer] = await connection.execute(
            'SELECT id FROM customer WHERE id = ? AND deleted_at IS NULL',
            [customerId]
        );
        if (!customer.length) throw new Error('Customer not found');
    }

    if (dealerId) {
        const [dealer] = await connection.execute(
            'SELECT id FROM dealer WHERE id = ? AND deleted_at IS NULL',
            [dealerId]
        );
        if (!dealer.length) throw new Error('Dealer not found');
    }

    if (paymentId) {
        const [payment] = await connection.execute(
            'SELECT id FROM payment WHERE id = ? AND deleted_at IS NULL',
            [paymentId]
        );
        if (!payment.length) throw new Error('Payment not found');
    }

    await connection.execute(
        'UPDATE sales SET item_id = ?, customer_id = ?, dealer_id = ?, payment_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [itemId || null, customerId || null, dealerId || null, paymentId || null, id]
    );
    const [updatedSale] = await connection.execute(
        'SELECT id, item_id, customer_id, dealer_id, payment_id, created_at, updated_at, deleted_at FROM sales WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedSale[0];
};

const deleteSale = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM sales WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE sales SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createSale, findAllSales, findSaleById, updateSale, deleteSale };