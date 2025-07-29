const pool = require('../../config/database');
const bcrypt = require('bcrypt');

const createUser = async (username, email, phone, address, profileImage, password, roleId, employedAt, bankingId) => {
    const connection = await pool.getConnection();

    await connection.beginTransaction();
    const [roleCheck] = await connection.execute(
        'SELECT id FROM roles WHERE id = ? AND deleted_at IS NULL',
        [roleId]
    );
    if (!roleCheck.length) throw new Error('Invalid role_id');
    if (bankingId) {
        const [bankingCheck] = await connection.execute(
            'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
            [bankingId]
        );
        if (!bankingCheck.length) throw new Error('Invalid banking_id');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.execute(
        'INSERT INTO users (username, email, phone, address, profile_image, password, role_id, employed_at, banking_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [username, email, phone, address, profileImage || null, hashedPassword, roleId, employedAt || null, bankingId || null]
    );
    const [user] = await connection.execute(
        'SELECT id, username, email, phone, address, profile_image, role_id, employed_at, banking_id, last_login, created_at, updated_at, deleted_at FROM users WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();

    connection.release();
    return user[0];
};

const findAllUsers = async () => {
    const [users] = await pool.execute('SELECT * FROM users WHERE deleted_at IS NULL');
    return users;
};

const findUserById = async (id) => {
    const [users] = await pool.execute(
        'SELECT id, username, email, phone, address, profile_image, role_id, employed_at, banking_id, last_login, created_at, updated_at, deleted_at FROM users WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return users[0] || null;
};

const updateUser = async (id, username, email, phone, address, profileImage, password, roleId, employedAt, bankingId) => {
    const connection = await pool.getConnection();

    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM users WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    const [roleCheck] = await connection.execute(
        'SELECT id FROM roles WHERE id = ? AND deleted_at IS NULL',
        [roleId]
    );
    if (!roleCheck.length) throw new Error('Invalid role_id');
    if (bankingId) {
        const [bankingCheck] = await connection.execute(
            'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
            [bankingId]
        );
        if (!bankingCheck.length) throw new Error('Invalid banking_id');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    await connection.execute(
        'UPDATE users SET username = ?, email = ?, phone = ?, address = ?, profile_image = ?, password = COALESCE(?, password), role_id = ?, employed_at = ?, banking_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [username, email, phone, address, profileImage || null, hashedPassword, roleId, employedAt || null, bankingId || null, id]
    );
    const [updatedUser] = await connection.execute(
        'SELECT id, username, email, phone, address, profile_image, role_id, employed_at, banking_id, last_login, created_at, updated_at, deleted_at FROM users WHERE id = ?',
        [id]
    );
    await connection.commit();

    connection.release();
    return updatedUser[0];
};

const updateLastLogin = async (id) => {
    const connection = await pool.getConnection();

    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM users WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [id]
    );
    const [updatedUser] = await connection.execute(
        'SELECT id, username, email, phone, address, profile_image, role_id, employed_at, banking_id, last_login, created_at, updated_at, deleted_at FROM users WHERE id = ?',
        [id]
    );
    await connection.commit();

    connection.release();
    return updatedUser[0];
};

const deleteUser = async (id) => {
    const connection = await pool.getConnection();

    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM users WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();

    connection.release();
    return true;
};

const updateUserPassword = async (id, newPassword) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM users WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await connection.execute(
        'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [hashedPassword, id]
    );
    const [updatedUser] = await connection.execute(
        'SELECT id, username, email, phone, address, profile_image, role_id, employed_at, banking_id, last_login, created_at, updated_at, deleted_at FROM users WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedUser[0];
};

const findUserByUsername = async (username, exactMatch = false, includePassword = false) => {
    const fields = includePassword
        ? 'id, username, email, phone, address, profile_image, password, role_id, employed_at, banking_id, last_login, created_at, updated_at, deleted_at'
        : 'id, username, email, phone, address, profile_image, role_id, employed_at, banking_id, last_login, created_at, updated_at, deleted_at';
    const query = exactMatch
        ? `SELECT ${fields} FROM users WHERE username = ? AND deleted_at IS NULL`
        : `SELECT ${fields} FROM users WHERE username LIKE ? AND deleted_at IS NULL`;
    const searchPattern = exactMatch ? username : `%${username}%`;
    const [users] = await pool.execute(query, [searchPattern]);
    return users;
};

const activateDeactivateUser = async (id, isActive) => {
    const connection = await pool.getConnection();

    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM users WHERE id = ?',
        [id]
    );
    if (!existing.length) throw new Error('User not found');

    const updateQuery = isActive
        ? 'UPDATE users SET deleted_at = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
        : 'UPDATE users SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    
    await connection.execute(updateQuery, [id]);
    const [updatedUser] = await connection.execute(
        'SELECT id, username, email, phone, address, profile_image, role_id, employed_at, banking_id, last_login, created_at, updated_at, deleted_at FROM users WHERE id = ?',
        [id]
    );
    await connection.commit();

    return updatedUser[0];
};

module.exports = { createUser, findAllUsers, findUserById, findUserByUsername, updateUser, updateLastLogin, deleteUser, updateUserPassword, activateDeactivateUser };