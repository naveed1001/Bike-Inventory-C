const { validateCreateDealer, validateUpdateDealer } = require('./dealerValidator');
const { ApiError, ApiResponse } = require('../../utils');
const DealerRepository = require('./dealerRepository');
const { StatusCodes } = require('http-status-codes');

class DealerService {
    async getAllDealers() {
        const dealers = await DealerRepository.findAllDealers();
        if (!dealers) {
            throw new ApiError('Failed to retrieve dealers', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Dealers retrieved successfully',
            payload: { dealers }
        });
    }

    async getDealerById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid dealer ID', StatusCodes.BAD_REQUEST);
        }
        const dealer = await DealerRepository.findDealerById(parsedId);
        if (!dealer) {
            throw new ApiError('Dealer not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Dealer retrieved successfully',
            payload: dealer
        });
    }

    async createDealer(data) {
        const { error } = validateCreateDealer(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, phone, email, address, brand_id, banking_id, organization_id } = data;
        const dealer = await DealerRepository.createDealer(name, phone, email, address, brand_id, banking_id, organization_id);
        if (dealer === 'Brand not found') {
            throw new ApiError('Invalid brand ID', StatusCodes.BAD_REQUEST);
        }
        if (dealer === 'Banking details not found') {
            throw new ApiError('Invalid banking details ID', StatusCodes.BAD_REQUEST);
        }
        if (dealer === 'Organization not found') {
            throw new ApiError('Invalid organization ID', StatusCodes.BAD_REQUEST);
        }
        if (dealer === 'Email already in use') {
            throw new ApiError('Email already in use', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Dealer created successfully',
            payload: dealer
        });
    }

    async updateDealer(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid dealer ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateDealer(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, phone, email, address, brand_id, banking_id, organization_id } = data;
        const dealer = await DealerRepository.updateDealer(parsedId, name, phone, email, address, brand_id, banking_id, organization_id);
        if (!dealer) {
            throw new ApiError('Dealer not found', StatusCodes.NOT_FOUND);
        }
        if (dealer === 'Brand not found') {
            throw new ApiError('Invalid brand ID', StatusCodes.BAD_REQUEST);
        }
        if (dealer === 'Banking details not found') {
            throw new ApiError('Invalid banking details ID', StatusCodes.BAD_REQUEST);
        }
        if (dealer === 'Organization not found') {
            throw new ApiError('Invalid organization ID', StatusCodes.BAD_REQUEST);
        }
        if (dealer === 'Email already in use') {
            throw new ApiError('Email already in use', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Dealer updated successfully',
            payload: dealer
        });
    }

    async deleteDealer(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid dealer ID', StatusCodes.BAD_REQUEST);
        }
        const success = await DealerRepository.deleteDealer(parsedId);
        if (!success) {
            throw new ApiError('Dealer not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Dealer soft deleted successfully',
            payload: { message: 'Dealer soft deleted successfully' }
        });
    }
}

module.exports = new DealerService();