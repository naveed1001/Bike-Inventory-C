const { validateCreateItemTransfer, validateUpdateItemTransfer } = require('./itemTransfersValidator');
const { ApiError, ApiResponse } = require('../../utils');
const ItemTransfersRepository = require('./itemTransfersRepository');
const { StatusCodes } = require('http-status-codes');

class ItemTransfersService {
    async getAllItemTransfers() {
        const itemTransfers = await ItemTransfersRepository.findAllItemTransfers();
        if (!itemTransfers) {
            throw new ApiError('Failed to retrieve item transfers', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Item transfers retrieved successfully',
            payload: { itemTransfers }
        });
    }

    async getItemTransferById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid item transfer ID', StatusCodes.BAD_REQUEST);
        }
        const itemTransfer = await ItemTransfersRepository.findItemTransferById(parsedId);
        if (!itemTransfer) {
            throw new ApiError('Item transfer not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Item transfer retrieved successfully',
            payload: itemTransfer
        });
    }

    async createItemTransfer(data) {
        const { error } = validateCreateItemTransfer(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { item_id, from_warehouse_id, to_warehouse_id, quantity, transferred_by, remarks } = data;
        const itemTransfer = await ItemTransfersRepository.createItemTransfer(item_id, from_warehouse_id, to_warehouse_id, quantity, transferred_by, remarks);
        if (itemTransfer === 'Item not found') {
            throw new ApiError('Invalid item ID', StatusCodes.BAD_REQUEST);
        }
        if (itemTransfer === 'From warehouse not found') {
            throw new ApiError('Invalid from warehouse ID', StatusCodes.BAD_REQUEST);
        }
        if (itemTransfer === 'To warehouse not found') {
            throw new ApiError('Invalid to warehouse ID', StatusCodes.BAD_REQUEST);
        }
        if (itemTransfer === 'User not found') {
            throw new ApiError('Invalid transferred by ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Item transfer created successfully',
            payload: itemTransfer
        });
    }

    async updateItemTransfer(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid item transfer ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateItemTransfer(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { item_id, from_warehouse_id, to_warehouse_id, quantity, transferred_by, remarks } = data;
        const itemTransfer = await ItemTransfersRepository.updateItemTransfer(parsedId, item_id, from_warehouse_id, to_warehouse_id, quantity, transferred_by, remarks);
        if (!itemTransfer) {
            throw new ApiError('Item transfer not found', StatusCodes.NOT_FOUND);
        }
        if (itemTransfer === 'Item not found') {
            throw new ApiError('Invalid item ID', StatusCodes.BAD_REQUEST);
        }
        if (itemTransfer === 'From warehouse not found') {
            throw new ApiError('Invalid from warehouse ID', StatusCodes.BAD_REQUEST);
        }
        if (itemTransfer === 'To warehouse not found') {
            throw new ApiError('Invalid to warehouse ID', StatusCodes.BAD_REQUEST);
        }
        if (itemTransfer === 'User not found') {
            throw new ApiError('Invalid transferred by ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Item transfer updated successfully',
            payload: itemTransfer
        });
    }

    async deleteItemTransfer(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid item transfer ID', StatusCodes.BAD_REQUEST);
        }
        const success = await ItemTransfersRepository.deleteItemTransfer(parsedId);
        if (!success) {
            throw new ApiError('Item transfer not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Item transfer soft deleted successfully',
            payload: { message: 'Item transfer soft deleted successfully' }
        });
    }
}

module.exports = new ItemTransfersService();