const pool = require('../../config/database');

const createInstallment = async (installmentPlanId, instrumentId, amount, remarks) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (installmentPlanId) {
        const [installmentPlan] = await connection.execute(
            'SELECT id FROM installment_plan WHERE id = ? AND deleted_at IS NULL',
            [installmentPlanId]
        );
        if (!installmentPlan.length) throw new Error('Installment plan not found');
    }

    if (instrumentId) {
        const [instrument] = await connection.execute(
            'SELECT id FROM instruments WHERE id = ? AND deleted_at IS NULL',
            [instrumentId]
        );
        if (!instrument.length) throw new Error('Instrument not found');
    }

    const [result] = await connection.execute(
        'INSERT INTO installment (installment_plan_id, instrument_id, amount, remarks) VALUES (?, ?, ?, ?)',
        [installmentPlanId || null, instrumentId || null, amount, remarks || null]
    );
    const [installment] = await connection.execute(
        'SELECT id, installment_plan_id, instrument_id, amount, remarks, created_at, updated_at, deleted_at FROM installment WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return installment[0];
};

const findAllInstallments = async () => {
    const [installments] = await pool.execute(
        'SELECT id, installment_plan_id, instrument_id, amount, remarks, created_at, updated_at, deleted_at FROM installment WHERE deleted_at IS NULL'
    );
    return installments;
};

const findInstallmentById = async (id) => {
    const [installments] = await pool.execute(
        'SELECT id, installment_plan_id, instrument_id, amount, remarks, created_at, updated_at, deleted_at FROM installment WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return installments[0] || null;
};

const updateInstallment = async (id, installmentPlanId, instrumentId, amount, remarks) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id FROM installment WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    if (installmentPlanId) {
        const [installmentPlan] = await connection.execute(
            'SELECT id FROM installment_plan WHERE id = ? AND deleted_at IS NULL',
            [installmentPlanId]
        );
        if (!installmentPlan.length) throw new Error('Installment plan not found');
    }

    if (instrumentId) {
        const [instrument] = await connection.execute(
            'SELECT id FROM instruments WHERE id = ? AND deleted_at IS NULL',
            [instrumentId]
        );
        if (!instrument.length) throw new Error('Instrument not found');
    }

    await connection.execute(
        'UPDATE installment SET installment_plan_id = ?, instrument_id = ?, amount = ?, remarks = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [installmentPlanId || null, instrumentId || null, amount, remarks || null, id]
    );
    const [updatedInstallment] = await connection.execute(
        'SELECT id, installment_plan_id, instrument_id, amount, remarks, created_at, updated_at, deleted_at FROM installment WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedInstallment[0];
};

const deleteInstallment = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM installment WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE installment SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createInstallment, findAllInstallments, findInstallmentById, updateInstallment, deleteInstallment };