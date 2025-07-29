const pool = require('../../config/database');

class RolesRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM roles WHERE deleted_at IS NULL');
        return rows;
    }

    async findById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid role ID');
        }
        const [rows] = await pool.query('SELECT * FROM roles WHERE id = ? AND deleted_at IS NULL', [parsedId]);
        if (rows.length === 0) {
            throw new Error('Role not found');
        }
        return rows[0];
    }

    async create(roleData) {
        if (!roleData || typeof roleData !== 'object' || !roleData.role_name || typeof roleData.role_name !== 'string') {
            throw new Error('Role name is required and must be a string');
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query(
            'INSERT INTO roles (role_name) VALUES (?)',
            [roleData.role_name]
        );
        await connection.commit();
        connection.release();
        return { id: result.insertId, role_name: roleData.role_name };
    }

    async update(id, roleData) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid role ID');
        }
        if (!roleData || typeof roleData !== 'object' || !roleData.role_name || typeof roleData.role_name !== 'string') {
            throw new Error('Role name is required and must be a string');
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query(
            'UPDATE roles SET role_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
            [roleData.role_name, parsedId]
        );
        if (result.affectedRows === 0) {
            throw new Error('Role not found or already deleted');
        }
        await connection.commit();
        connection.release();
        return { id: parsedId, role_name: roleData.role_name };
    }

    async deleteRole(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid role ID');
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query(
            'UPDATE roles SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
            [parsedId]
        );
        if (result.affectedRows === 0) {
            throw new Error('Role not found or already deleted');
        }
        const [verifyRows] = await connection.query(
            'SELECT deleted_at FROM roles WHERE id = ?',
            [parsedId]
        );
        if (verifyRows.length === 0 || !verifyRows[0].deleted_at) {
            throw new Error('Failed to verify soft delete');
        }
        await connection.commit();
        connection.release();
        return { message: 'Role soft deleted successfully', deleted_at: verifyRows[0].deleted_at };
    }
}

module.exports = new RolesRepository();