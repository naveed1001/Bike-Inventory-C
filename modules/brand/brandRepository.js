const pool = require('../../config/database');

const createBrand = async (name, logo, website) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [result] = await connection.execute(
        'INSERT INTO brand (name, logo, website) VALUES (?, ?, ?)',
        [name, logo || null, website || null]
    );
    const [brand] = await connection.execute(
        'SELECT id, name, logo, website, created_at, updated_at, deleted_at FROM brand WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return brand[0];
};

const findAllBrands = async () => {
    const [brands] = await pool.execute(
        'SELECT id, name, logo, website, created_at, updated_at, deleted_at FROM brand WHERE deleted_at IS NULL'
    );
    return brands;
};

const findBrandById = async (id) => {
    const [brands] = await pool.execute(
        'SELECT id, name, logo, website, created_at, updated_at, deleted_at FROM brand WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return brands[0] || null;
};

const updateBrand = async (id, name, logo, website) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM brand WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE brand SET name = ?, logo = ?, website = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, logo || null, website || null, id]
    );
    const [updatedBrand] = await connection.execute(
        'SELECT id, name, logo, website, created_at, updated_at, deleted_at FROM brand WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedBrand[0];
};

const deleteBrand = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM brand WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE brand SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createBrand, findAllBrands, findBrandById, updateBrand, deleteBrand };