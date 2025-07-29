const { validateCreateStatus, validateUpdateStatus } = require('./statusValidator');
const { ApiError, ApiResponse } = require('../../utils');
const StatusRepository = require('./statusRepository');
const { StatusCodes } = require('http-status-codes');

class StatusService {
    async getAllStatuses() {
        const statuses = await StatusRepository.findAllStatuses();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Statuses retrieved successfully',
            payload: statuses
        });
    }

    async getStatusById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid status ID', StatusCodes.BAD_REQUEST);
        }
        const status = await StatusRepository.findStatusById(parsedId);
        if (!status) {
            throw new ApiError('Status not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Status retrieved successfully',
            payload: status
        });
    }

    async createStatus(data) {
        const { error } = validateCreateStatus(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, value } = data;
        const status = await StatusRepository.createStatus(name, value);
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Status created successfully',
            payload: status
        });
    }

    async updateStatus(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid status ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateStatus(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, value } = data;
        const status = await StatusRepository.updateStatus(parsedId, name, value);
        if (!status) {
            throw new ApiError('Status not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Status updated successfully',
            payload: status
        });
    }

    async deleteStatus(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid status ID', StatusCodes.BAD_REQUEST);
        }
        const success = await StatusRepository.deleteStatus(parsedId);
        if (!success) {
            throw new ApiError('Status not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Status soft deleted successfully',
            payload: { message: 'Status soft deleted successfully' }
        });
    }
}

module.exports = new StatusService();