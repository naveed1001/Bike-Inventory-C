const { validateCreateCapacityType, validateUpdateCapacityType } = require('./capacityTypesValidator');
const { ApiError, ApiResponse } = require('../../utils');
const CapacityTypesRepository = require('./capacityTypesRepository');
const pool = require('../../config/database');
const { StatusCodes } = require('http-status-codes');

class CapacityTypesService {
    async getAllCapacityTypes() {
        const capacityTypes = await CapacityTypesRepository.findAllCapacityTypes();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Capacity types retrieved successfully',
            payload: { capacityTypes }
        });
    }

    async getCapacityTypeById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid capacity type ID', StatusCodes.BAD_REQUEST);
        }
        const capacityType = await CapacityTypesRepository.findCapacityTypeById(parsedId);
        if (!capacityType) {
            throw new ApiError('Capacity type not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Capacity type retrieved successfully',
            payload: capacityType
        });
    }

    async createCapacityType(data) {
        const { error } = validateCreateCapacityType(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { item_type_id, item_capacity, warehouse_id } = data;

        const [itemType] = await pool.execute('SELECT id FROM item_types WHERE id = ? AND deleted_at IS NULL', [item_type_id]);
        if (!itemType.length) {
            throw new ApiError('Invalid item type ID: referenced row does not exist', StatusCodes.BAD_REQUEST);
        }
        const [warehouse] = await pool.execute('SELECT id FROM warehouse WHERE id = ? AND deleted_at IS NULL', [warehouse_id]);
        if (!warehouse.length) {
            throw new ApiError('Invalid warehouse ID: referenced row does not exist', StatusCodes.BAD_REQUEST);
        }

        const capacityType = await CapacityTypesRepository.createCapacityType(item_type_id, item_capacity, warehouse_id);
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Capacity type created successfully',
            payload: capacityType
        });
    }

    async updateCapacityType(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid capacity type ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateCapacityType(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { item_type_id, item_capacity, warehouse_id } = data;
        const capacityType = await CapacityTypesRepository.updateCapacityType(parsedId, item_type_id, item_capacity, warehouse_id);
        if (!capacityType) {
            throw new ApiError('Capacity type not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Capacity type updated successfully',
            payload: capacityType
        });
    }

    async deleteCapacityType(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid capacity type ID', StatusCodes.BAD_REQUEST);
        }
        const success = await CapacityTypesRepository.deleteCapacityType(parsedId);
        if (!success) {
            throw new ApiError('Capacity type not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Capacity type soft deleted successfully',
            payload: { message: 'Capacity type soft deleted successfully' }
        });
    }
}

module.exports = new CapacityTypesService();