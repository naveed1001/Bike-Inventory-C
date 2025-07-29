const { validateCreateItemType, validateUpdateItemType } = require('./itemTypesValidator');
const { ApiError, ApiResponse } = require('../../utils');
const ItemTypesRepository = require('./itemTypesRepository');
const { StatusCodes } = require('http-status-codes');

class ItemTypesService {
    async getAllItemTypes() {
        const itemTypes = await ItemTypesRepository.findAllItemTypes();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Item types retrieved successfully',
            payload: { itemTypes }
        });
    }

    async getItemTypeById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid item type ID', StatusCodes.BAD_REQUEST);
        }
        const itemType = await ItemTypesRepository.findItemTypeById(parsedId);
        if (!itemType) {
            throw new ApiError('Item type not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Item type retrieved successfully',
            payload: itemType
        });
    }

    async createItemType(data) {
        const { error } = validateCreateItemType(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, description } = data;
        const itemType = await ItemTypesRepository.createItemType(name, description);
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Item type created successfully',
            payload: itemType
        });
    }

    async updateItemType(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid item type ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateItemType(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, description } = data;
        const itemType = await ItemTypesRepository.updateItemType(parsedId, name, description);
        if (!itemType) {
            throw new ApiError('Item type not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Item type updated successfully',
            payload: itemType
        });
    }

    async deleteItemType(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid item type ID', StatusCodes.BAD_REQUEST);
        }
        const success = await ItemTypesRepository.deleteItemType(parsedId);
        if (!success) {
            throw new ApiError('Item type not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Item type soft deleted successfully',
            payload: { message: 'Item type soft deleted successfully' }
        });
    }
}

module.exports = new ItemTypesService();