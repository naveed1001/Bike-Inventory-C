const db = require('../../config/database');

class CountriesRepository {
    async findAll() {
        const [rows] = await db.query('SELECT * FROM countries WHERE deleted_at IS NULL');
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM countries WHERE id = ? AND deleted_at IS NULL', [id]);
        return rows[0];
    }

    async create(data) {
        const { name } = data;
        const [result] = await db.query(
            'INSERT INTO countries (name) VALUES (?)',
            [name]
        );
        const [newCountry] = await db.query('SELECT * FROM countries WHERE id = ?', [result.insertId]);
        return newCountry[0];
    }

    async update(id, data) {
        const { name } = data;
        const [result] = await db.query(
            'UPDATE countries SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
            [name, id]
        );
        if (result.affectedRows === 0) return null;
        const [updatedCountry] = await db.query('SELECT * FROM countries WHERE id = ?', [id]);
        return updatedCountry[0];
    }

    async delete(id) {
        const [result] = await db.query(
            'UPDATE countries SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = new CountriesRepository();