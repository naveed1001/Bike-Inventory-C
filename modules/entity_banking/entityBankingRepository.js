const pool = require('../../config/database');

const createEntityBanking = async (entityType, entityId, bankingId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (bankingId) {
        const [banking] = await connection.execute(
            'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
            [bankingId]
        );
        if (!banking.length) throw new Error('Banking details not found');
    }

    const [result] = await connection.execute(
        'INSERT INTO entity_banking (entity_type, entity_id, banking_id) VALUES (?, ?, ?)',
        [entityType, entityId, bankingId || null]
    );
    const [entityBanking] = await connection.execute(
        'SELECT id, entity_type, entity_id, banking_id, created_at, updated_at, deleted_at FROM entity_banking WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return entityBanking[0];
};

const findAllEntityBankings = async () => {
    const [entityBankings] = await pool.execute(
        'SELECT id, entity_type, entity_id, banking_id, created_at, updated_at, deleted_at FROM entity_banking WHERE deleted_at IS NULL'
    );
    return entityBankings;
};

const findEntityBankingById = async (id) => {
    const [entityBankings] = await pool.execute(
        'SELECT id, entity_type, entity_id, banking_id, created_at, updated_at, deleted_at FROM entity_banking WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return entityBankings[0] || null;
};

const updateEntityBanking = async (id, entityType, entityId, bankingId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id FROM entity_banking WHERE id = ? AND deleted_at IS NULL',
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

    await connection.execute(
        'UPDATE entity_banking SET entity_type = ?, entity_id = ?, banking_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [entityType, entityId, bankingId || null, id]
    );
    const [updatedEntityBanking] = await connection.execute(
        'SELECT id, entity_type, entity_id, banking_id, created_at, updated_at, deleted_at FROM entity_banking WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedEntityBanking[0];
};

const deleteEntityBanking = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM entity_banking WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE entity_banking SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createEntityBanking, findAllEntityBankings, findEntityBankingById, updateEntityBanking, deleteEntityBanking };