const pool = require('../../config/database');

const createShippingAgent = async (name, address, phone, email, countryId, cityId, organizationId, bankingId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    if (countryId) {
        const [country] = await connection.execute(
            'SELECT id FROM countries WHERE id = ? AND deleted_at IS NULL',
            [countryId]
        );
        if (!country.length) throw new Error('Country not found');
    }

    if (cityId) {
        const [city] = await connection.execute(
            'SELECT id FROM cities WHERE id = ? AND deleted_at IS NULL',
            [cityId]
        );
        if (!city.length) throw new Error('City not found');
    }

    if (organizationId) {
        const [organization] = await connection.execute(
            'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
            [organizationId]
        );
        if (!organization.length) throw new Error('Organization not found');
    }

    if (bankingId) {
        const [banking] = await connection.execute(
            'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
            [bankingId]
        );
        if (!banking.length) throw new Error('Banking details not found');
    }

    if (email) {
        const [existingAgent] = await connection.execute(
            'SELECT id FROM shipping_agent WHERE email = ? AND deleted_at IS NULL',
            [email]
        );
        if (existingAgent.length) throw new Error('Email already in use');
    }

    const [result] = await connection.execute(
        'INSERT INTO shipping_agent (name, address, phone, email, country_id, city_id, organization_id, banking_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, address || null, phone || null, email || null, countryId || null, cityId || null, organizationId || null, bankingId || null]
    );
    const [shippingAgent] = await connection.execute(
        'SELECT id, name, address, phone, email, country_id, city_id, organization_id, banking_id, created_at, updated_at, deleted_at FROM shipping_agent WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return shippingAgent[0];
};

const findAllShippingAgents = async () => {
    const [shippingAgents] = await pool.execute(
        'SELECT id, name, address, phone, email, country_id, city_id, organization_id, banking_id, created_at, updated_at, deleted_at FROM shipping_agent WHERE deleted_at IS NULL'
    );
    return shippingAgents;
};

const findShippingAgentById = async (id) => {
    const [shippingAgents] = await pool.execute(
        'SELECT id, name, address, phone, email, country_id, city_id, organization_id, banking_id, created_at, updated_at, deleted_at FROM shipping_agent WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return shippingAgents[0] || null;
};

const updateShippingAgent = async (id, name, address, phone, email, countryId, cityId, organizationId, bankingId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id, email FROM shipping_agent WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    if (countryId) {
        const [country] = await connection.execute(
            'SELECT id FROM countries WHERE id = ? AND deleted_at IS NULL',
            [countryId]
        );
        if (!country.length) throw new Error('Country not found');
    }

    if (cityId) {
        const [city] = await connection.execute(
            'SELECT id FROM cities WHERE id = ? AND deleted_at IS NULL',
            [cityId]
        );
        if (!city.length) throw new Error('City not found');
    }

    if (organizationId) {
        const [organization] = await connection.execute(
            'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
            [organizationId]
        );
        if (!organization.length) throw new Error('Organization not found');
    }

    if (bankingId) {
        const [banking] = await connection.execute(
            'SELECT id FROM banking_details WHERE id = ? AND deleted_at IS NULL',
            [bankingId]
        );
        if (!banking.length) throw new Error('Banking details not found');
    }

    if (email && email !== existing[0].email) {
        const [otherAgent] = await connection.execute(
            'SELECT id FROM shipping_agent WHERE email = ? AND deleted_at IS NULL AND id != ?',
            [email, id]
        );
        if (otherAgent.length) throw new Error('Email already in use');
    }

    await connection.execute(
        'UPDATE shipping_agent SET name = ?, address = ?, phone = ?, email = ?, country_id = ?, city_id = ?, organization_id = ?, banking_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, address || null, phone || null, email || null, countryId || null, cityId || null, organizationId || null, bankingId || null, id]
    );
    const [updatedAgent] = await connection.execute(
        'SELECT id, name, address, phone, email, country_id, city_id, organization_id, banking_id, created_at, updated_at, deleted_at FROM shipping_agent WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedAgent[0];
};

const deleteShippingAgent = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM shipping_agent WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE shipping_agent SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createShippingAgent, findAllShippingAgents, findShippingAgentById, updateShippingAgent, deleteShippingAgent };