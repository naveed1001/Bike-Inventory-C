const pool = require('../../config/database');

const createItem = async (name, brandId, modelNumber, identificationNumber, color, statusId, arrivalDate, manufacturingDate, price, discount, discountCoupon, soldTo, organizationId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [brand] = await connection.execute(
        'SELECT id FROM brand WHERE id = ? AND deleted_at IS NULL',
        [brandId]
    );
    if (!brand.length) throw new Error('Brand not found');

    const [status] = await connection.execute(
        'SELECT id FROM status WHERE id = ? AND deleted_at IS NULL',
        [statusId]
    );
    if (!status.length) throw new Error('Status not found');

    const [organization] = await connection.execute(
        'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
        [organizationId]
    );
    if (!organization.length) throw new Error('Organization not found');

    if (identificationNumber) {
        const [existingItem] = await connection.execute(
            'SELECT id FROM item WHERE identification_number = ? AND deleted_at IS NULL',
            [identificationNumber]
        );
        if (existingItem.length) throw new Error('Identification number already in use');
    }

    const [result] = await connection.execute(
        'INSERT INTO item (name, brand_id, model_number, identification_number, color, status_id, arrival_date, manufacturing_date, price, discount, discount_coupon, sold_to, organization_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, brandId, modelNumber || null, identificationNumber || null, color || null, statusId, arrivalDate || null, manufacturingDate || null, price || null, discount || null, discountCoupon || null, soldTo || null, organizationId]
    );
    const [item] = await connection.execute(
        'SELECT id, name, brand_id, model_number, identification_number, color, status_id, arrival_date, manufacturing_date, price, discount, discount_coupon, sold_to, organization_id, created_at, updated_at, deleted_at FROM item WHERE id = ?',
        [result.insertId]
    );
    await connection.commit();
    connection.release();
    return item[0];
};

const findAllItems = async () => {
    const [items] = await pool.execute(
        'SELECT id, name, brand_id, model_number, identification_number, color, status_id, arrival_date, manufacturing_date, price, discount, discount_coupon, sold_to, organization_id, created_at, updated_at, deleted_at FROM item WHERE deleted_at IS NULL'
    );
    return items;
};

const findItemById = async (id) => {
    const [items] = await pool.execute(
        'SELECT id, name, brand_id, model_number, identification_number, color, status_id, arrival_date, manufacturing_date, price, discount, discount_coupon, sold_to, organization_id, created_at, updated_at, deleted_at FROM item WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    return items[0] || null;
};

const updateItem = async (id, name, brandId, modelNumber, identificationNumber, color, statusId, arrivalDate, manufacturingDate, price, discount, discountCoupon, soldTo, organizationId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.execute(
        'SELECT id, identification_number FROM item WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');

    const [brand] = await connection.execute(
        'SELECT id FROM brand WHERE id = ? AND deleted_at IS NULL',
        [brandId]
    );
    if (!brand.length) throw new Error('Brand not found');

    const [status] = await connection.execute(
        'SELECT id FROM status WHERE id = ? AND deleted_at IS NULL',
        [statusId]
    );
    if (!status.length) throw new Error('Status not found');

    const [organization] = await connection.execute(
        'SELECT id FROM organization WHERE id = ? AND deleted_at IS NULL',
        [organizationId]
    );
    if (!organization.length) throw new Error('Organization not found');

    if (identificationNumber && identificationNumber !== existing[0].identification_number) {
        const [otherItem] = await connection.execute(
            'SELECT id FROM item WHERE identification_number = ? AND deleted_at IS NULL AND id != ?',
            [identificationNumber, id]
        );
        if (otherItem.length) throw new Error('Identification number already in use');
    }

    await connection.execute(
        'UPDATE item SET name = ?, brand_id = ?, model_number = ?, identification_number = ?, color = ?, status_id = ?, arrival_date = ?, manufacturing_date = ?, price = ?, discount = ?, discount_coupon = ?, sold_to = ?, organization_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, brandId, modelNumber || null, identificationNumber || null, color || null, statusId, arrivalDate || null, manufacturingDate || null, price || null, discount || null, discountCoupon || null, soldTo || null, organizationId, id]
    );
    const [updatedItem] = await connection.execute(
        'SELECT id, name, brand_id, model_number, identification_number, color, status_id, arrival_date, manufacturing_date, price, discount, discount_coupon, sold_to, organization_id, created_at, updated_at, deleted_at FROM item WHERE id = ?',
        [id]
    );
    await connection.commit();
    connection.release();
    return updatedItem[0];
};

const deleteItem = async (id) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existing] = await connection.execute(
        'SELECT id FROM item WHERE id = ? AND deleted_at IS NULL',
        [id]
    );
    if (!existing.length) throw new Error('Not found');
    await connection.execute('UPDATE item SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    await connection.commit();
    connection.release();
    return true;
};

module.exports = { createItem, findAllItems, findItemById, updateItem, deleteItem };