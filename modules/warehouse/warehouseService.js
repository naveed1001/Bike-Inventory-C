const { validateCreateWarehouse, validateUpdateWarehouse } = require('./warehouseValidator');
const { ApiError, ApiResponse } = require('../../utils');
const WarehouseRepository = require('./warehouseRepository');
const { StatusCodes } = require('http-status-codes');

class WarehouseService {
    async getAllWarehouses() {
        const warehouses = await WarehouseRepository.findAllWarehouses();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Warehouses retrieved successfully',
            payload: { warehouses }
        });
    }

    async getWarehouseById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid warehouse ID', StatusCodes.BAD_REQUEST);
        }
        const warehouse = await WarehouseRepository.findWarehouseById(parsedId);
        if (!warehouse) {
            throw new ApiError('Warehouse not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Warehouse retrieved successfully',
            payload: warehouse
        });
    }

    async createWarehouse(data) {
        const { error } = validateCreateWarehouse(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, organization_id, address, area, location } = data;
        const warehouse = await WarehouseRepository.createWarehouse(
            name,
            organization_id,
            address,
            area,
            location
        );
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Warehouse created successfully',
            payload: warehouse
        });
    }

    async updateWarehouse(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid warehouse ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateWarehouse(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, organization_id, address, area, location } = data;
        const warehouse = await WarehouseRepository.updateWarehouse(
            parsedId,
            name,
            organization_id,
            address,
            area,
            location
        );
        if (!warehouse) {
            throw new ApiError('Warehouse not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Warehouse updated successfully',
            payload: warehouse
        });
    }

    async deleteWarehouse(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid warehouse ID', StatusCodes.BAD_REQUEST);
        }
        const success = await WarehouseRepository.deleteWarehouse(parsedId);
        if (!success) {
            throw new ApiError('Warehouse not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Warehouse soft deleted successfully',
            payload: { message: 'Warehouse soft deleted successfully' }
        });
    }
}

module.exports = new WarehouseService();