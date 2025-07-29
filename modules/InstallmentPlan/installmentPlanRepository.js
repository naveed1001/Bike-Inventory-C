const pool = require('../../config/database');

const createInstallmentPlan = async (name, advanceAmount, tenure, installmentAmount) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.execute(
        'INSERT INTO installment_plan (name, advance_amount, tenure, installment_amount) VALUES (?, ?, ?, ?)',
        [name, advanceAmount, tenure, installmentAmount]
    );
    const [installmentPlan] = await connection.execute(
        'SELECT id, name, advance_amount, tenure, installment_amount, created_at, updated_at, deleted_at FROM installment_plan WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return installmentPlan[0];
};

const findAllInstallmentPlans = async () => {
    const [installmentPlans] = await pool.execute(
        'SELECT id, name, advance_amount, tenure, installment_amount, created_at, updated_at, deleted_at FROM installment_plan WHERE deleted_at IS NULL'
    );
    return installmentPlans;
};

const findInstallmentPlanById = async (id) => {
    const [installmentPlans] = await pool.execute(
        'SELECT id, name, advance_amount, tenure, installment_amount, created_at, updated_at, deleted_at FROM installment_plan WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return installmentPlans[0] || null;
};

const updateInstallmentPlan = async (id, name, advanceAmount, tenure, installmentAmount) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM installment_plan WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE installment_plan SET name = ?, advance_amount = ?, tenure = ?, installment_amount = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, advanceAmount, tenure, installmentAmount, id]
    );
    const [updatedInstallmentPlan] = await connection.execute(
        'SELECT id, name, advance_amount, tenure, installment_amount, created_at, updated_at, deleted_at FROM installment_plan WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedInstallmentPlan[0];
};

const deleteInstallmentPlan = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM installment_plan WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE installment_plan SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createInstallmentPlan, findAllInstallmentPlans, findInstallmentPlanById, updateInstallmentPlan, deleteInstallmentPlan };