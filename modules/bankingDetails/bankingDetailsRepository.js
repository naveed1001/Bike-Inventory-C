const pool = require('../../config/database');

class BankingDetailsRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT id, name, account_number, branch, iban, created_at, updated_at, deleted_at FROM banking_details WHERE deleted_at IS NULL');
        return rows;
    }

    async findById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error(`Invalid banking detail ID provided: ${id}`);
        }
        const [rows] = await pool.query('SELECT id, name, account_number, branch, iban, created_at, updated_at, deleted_at FROM banking_details WHERE id = ? AND deleted_at IS NULL', [parsedId]);
        if (rows.length === 0) {
            throw new Error(`Banking detail not found for id: ${parsedId}`);
        }
        return rows[0];
    }

    async create(bankingDetailData) {
        if (!bankingDetailData || !bankingDetailData.name || !bankingDetailData.account_number) {
            throw new Error('Name and account number are required, Invalid banking detail data provided', { bankingDetailData });
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO banking_details (name, account_number, branch, iban) VALUES (?, ?, ?, ?)',
            [bankingDetailData.name, bankingDetailData.account_number, bankingDetailData.branch, bankingDetailData.iban]
        );
        await connection.commit();
        connection.release();
        return { id: result.insertId, ...bankingDetailData };
    }

    async update(id, bankingDetailData) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error(`Invalid banking detail ID provided: ${id}`);
        }
        if (!bankingDetailData || !bankingDetailData.name || !bankingDetailData.account_number) {
            throw new Error('Name and account number are required, Invalid banking detail data provided for update', { bankingDetailData });
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        const [result] = await connection.query(
            'UPDATE banking_details SET name = ?, account_number = ?, branch = ?, iban = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
            [bankingDetailData.name, bankingDetailData.account_number, bankingDetailData.branch, bankingDetailData.iban, parsedId]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Banking detail not found or already deleted for id: ${parsedId}`);
        }
        await connection.commit();
        connection.release();
        return { id: parsedId, ...bankingDetailData };
    }

    async delete(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error(`Invalid banking detail ID provided: ${id}`);
        }
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const [result] = await connection.query(
            'UPDATE banking_details SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
            [parsedId]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Banking detail not found or already deleted for id: ${parsedId}`);
        }
        const [verifyRows] = await connection.query(
            'SELECT deleted_at FROM banking_details WHERE id = ?',
            [parsedId]
        );
        await connection.commit();
        connection.release();
        return { message: 'Banking detail soft deleted successfully', deleted_at: verifyRows[0].deleted_at };
    }
}

module.exports = new BankingDetailsRepository();