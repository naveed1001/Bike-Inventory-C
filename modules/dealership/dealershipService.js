const { validateCreateDealership, validateUpdateDealership } = require('./dealershipValidator');
const { ApiError, ApiResponse } = require('../../utils');
const DealershipRepository = require('./dealershipRepository');
const { StatusCodes } = require('http-status-codes');

class DealershipService {
    async getAllDealerships() {
        const dealerships = await DealershipRepository.findAllDealerships();
        if (!dealerships) {
            throw new ApiError('Failed to retrieve dealerships', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Dealerships retrieved successfully',
            payload: { dealerships }
        });
    }

    async getDealershipById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid dealership ID', StatusCodes.BAD_REQUEST);
        }
        const dealership = await DealershipRepository.findDealershipById(parsedId);
        if (!dealership) {
            throw new ApiError('Dealership not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Dealership retrieved successfully',
            payload: dealership
        });
    }

    async createDealership(data) {
        const { error } = validateCreateDealership(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, phone, address, email, website, banking_id, dealer_id } = data;
        const dealership = await DealershipRepository.createDealership(name, phone, address, email, website, banking_id, dealer_id);
        if (dealership === 'Banking details not found') {
            throw new ApiError('Invalid banking details ID', StatusCodes.BAD_REQUEST);
        }
        if (dealership === 'Dealer not found') {
            throw new ApiError('Invalid dealer ID', StatusCodes.BAD_REQUEST);
        }
        if (dealership === 'Email already in use') {
            throw new ApiError('Email already in use', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Dealership created successfully',
            payload: dealership
        });
    }

    async updateDealership(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid dealership ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateDealership(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, phone, address, email, website, banking_id, dealer_id } = data;
        const dealership = await DealershipRepository.updateDealership(parsedId, name, phone, address, email, website, banking_id, dealer_id);
        if (!dealership) {
            throw new ApiError('Dealership not found', StatusCodes.NOT_FOUND);
        }
        if (dealership === 'Banking details not found') {
            throw new ApiError('Invalid banking details ID', StatusCodes.BAD_REQUEST);
        }
        if (dealership === 'Dealer not found') {
            throw new ApiError('Invalid dealer ID', StatusCodes.BAD_REQUEST);
        }
        if (dealership === 'Email already in use') {
            throw new ApiError('Email already in use', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Dealership updated successfully',
            payload: dealership
        });
    }

    async deleteDealership(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid dealership ID', StatusCodes.BAD_REQUEST);
        }
        const success = await DealershipRepository.deleteDealership(parsedId);
        if (!success) {
            throw new ApiError('Dealership not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Dealership soft deleted successfully',
            payload: { message: 'Dealership soft deleted successfully' }
        });
    }
}

module.exports = new DealershipService();