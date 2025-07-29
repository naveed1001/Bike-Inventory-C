const pool = require('../../config/database');

class PermissionsRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM permissions WHERE deleted_at IS NULL');
        return rows;
    }

    async findById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid permission ID');
        }
        const [rows] = await pool.query('SELECT * FROM permissions WHERE id = ? AND deleted_at IS NULL', [parsedId]);
        if (rows.length === 0) {
            throw new Error('Permission not found');
        }
        return rows[0];
    }

    async create(permissionData) {
        if (!permissionData || typeof permissionData !== 'object' || !permissionData.permission_name || !permissionData.permission_key) {
            throw new Error('Permission name and key are required');
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query(
            'INSERT INTO permissions (permission_name, permission_key) VALUES (?, ?)',
            [permissionData.permission_name, permissionData.permission_key]
        );
        await connection.commit();
        connection.release();
        return { id: result.insertId, ...permissionData };
    }

    async update(id, permissionData) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error(`Invalid permission ID provided: ${id}`);
        }
        if (!permissionData || typeof permissionData !== 'object' || !permissionData.permission_name || !permissionData.permission_key) {
            throw new Error('Permission name and key are required, Invalid permission data provided for update', { permissionData });
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query(
            'UPDATE permissions SET permission_name = ?, permission_key = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
            [permissionData.permission_name, permissionData.permission_key, parsedId]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Permission not found or already deleted for id: ${parsedId}`);
        }
        await connection.commit();
        connection.release();
        return { id: parsedId, ...permissionData };
    }

    async deletePermission(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error(`Invalid permission ID provided: ${id}`);
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query(
            'UPDATE permissions SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
            [parsedId]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Permission not found or already deleted for id: ${parsedId}`);
        }
        const [verifyRows] = await connection.query(
            'SELECT deleted_at FROM permissions WHERE id = ?',
            [parsedId]
        );
        if (verifyRows.length === 0 || !verifyRows[0].deleted_at) {
            throw new Error(`Failed to verify soft delete, Verification failed: Permission with id ${parsedId} was not updated`);
        }
        await connection.commit();
        connection.release();
        return { message: 'Permission soft deleted successfully', deleted_at: verifyRows[0].deleted_at };
    }

    async assignPermission(roleId, permissionId) {
        const parsedRoleId = parseInt(roleId, 10);
        const parsedPermissionId = parseInt(permissionId, 10);
        if (isNaN(parsedRoleId) || parsedRoleId <= 0 || isNaN(parsedPermissionId) || parsedPermissionId <= 0) {
            throw new Error(`Invalid role ID or permission ID provided: ${roleId}, ${permissionId}`);
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query(
            'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
            [parsedRoleId, parsedPermissionId]
        );
        await connection.commit();
        connection.release();
        return { id: result.insertId, role_id: parsedRoleId, permission_id: parsedPermissionId };
    }

    async unassignPermission(roleId, permissionId) {
        const parsedRoleId = parseInt(roleId, 10);
        const parsedPermissionId = parseInt(permissionId, 10);
        if (isNaN(parsedRoleId) || parsedRoleId <= 0 || isNaN(parsedPermissionId) || parsedPermissionId <= 0) {
            throw new Error(`Invalid role ID or permission ID provided: ${roleId}, ${permissionId}`);
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query(
            'UPDATE role_permissions SET deleted_at = CURRENT_TIMESTAMP WHERE role_id = ? AND permission_id = ? AND deleted_at IS NULL',
            [parsedRoleId, parsedPermissionId]
        );
        if (result.affectedRows === 0) {
            throw new Error(`No active assignment found for role ${parsedRoleId} and permission ${parsedPermissionId}`);
        }
        await connection.commit();
        connection.release();
        return { message: 'Permission unassigned successfully', role_id: parsedRoleId, permission_id: parsedPermissionId };
    }
}

module.exports = new PermissionsRepository();