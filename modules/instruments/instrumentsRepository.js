const pool = require('../../config/database');

const createInstrument = async (number, amount, date, picture) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.execute(
        'INSERT INTO instruments (number, amount, date, picture) VALUES (?, ?, ?, ?)',
        [number, amount, date, picture]
    );
    const [instrument] = await connection.execute(
        'SELECT id, number, amount, date, picture, created_at, updated_at, deleted_at FROM instruments WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return instrument[0];
};

const findAllInstruments = async () => {
    const [instruments] = await pool.execute(
        'SELECT id, number, amount, date, picture, created_at, updated_at, deleted_at FROM instruments WHERE deleted_at IS NULL'
    );
    return instruments;
};

const findInstrumentById = async (id) => {
    const [instruments] = await pool.execute(
        'SELECT id, number, amount, date, picture, created_at, updated_at, deleted_at FROM instruments WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return instruments[0] || null;
};

const updateInstrument = async (id, number, amount, date, picture) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM instruments WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE instruments SET number = ?, amount = ?, date = ?, picture = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [number, amount, date, picture, id]
    );
    const [updatedInstrument] = await connection.execute(
        'SELECT id, number, amount, date, picture, created_at, updated_at, deleted_at FROM instruments WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedInstrument[0];
};

const deleteInstrument = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM instruments WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE instruments SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createInstrument, findAllInstruments, findInstrumentById, updateInstrument, deleteInstrument };