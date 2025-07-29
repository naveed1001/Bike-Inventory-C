const pool = require('../../config/database');

const createCity = async (name) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.execute('INSERT INTO cities (name) VALUES (?)', [name]);
    const [city] = await connection.execute(
        'SELECT id, name, created_at, updated_at, deleted_at FROM cities WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return city[0];
};

const findAllCities = async () => {
    const [cities] = await pool.execute(
        'SELECT id, name, created_at, updated_at, deleted_at FROM cities WHERE deleted_at IS NULL'
    );
    return cities;
};

const findCityById = async (id) => {
    const [cities] = await pool.execute(
        'SELECT id, name, created_at, updated_at, deleted_at FROM cities WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return cities[0] || null;
};

const updateCity = async (id, name) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM cities WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE cities SET name = ? WHERE id = ?', [name, id]);
    const [updatedCity] = await connection.execute(
        'SELECT id, name, created_at, updated_at, deleted_at FROM cities WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedCity[0];
};

const deleteCity = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM cities WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE cities SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createCity, findAllCities, findCityById, updateCity, deleteCity };