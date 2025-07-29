const { validateCreateSpecification, validateUpdateSpecification } = require('./specificationsValidator');
const { ApiError, ApiResponse } = require('../../utils');
const SpecificationsRepository = require('./specificationsRepository');
const pool = require('../../config/database');
const { StatusCodes } = require('http-status-codes');

class SpecificationsService {
    async getAllSpecifications() {
        const specifications = await SpecificationsRepository.findAllSpecifications();
        if (!specifications) {
            throw new ApiError('Failed to retrieve specifications', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Specifications retrieved successfully',
            payload: { specifications }
        });
    }

    async getSpecificationById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid specification ID', StatusCodes.BAD_REQUEST);
        }
        const specification = await SpecificationsRepository.findSpecificationById(parsedId);
        if (!specification) {
            throw new ApiError('Specification not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Specification retrieved successfully',
            payload: specification
        });
    }

    async createSpecification(data) {
        const { error } = validateCreateSpecification(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, value, item_id } = data;
        if (item_id) {
            const [item] = await pool.execute('SELECT id FROM item WHERE id = ? AND deleted_at IS NULL', [item_id]);
            if (!item.length) {
                throw new ApiError('Invalid item ID: referenced row does not exist', StatusCodes.BAD_REQUEST);
            }
        }
        const specification = await SpecificationsRepository.createSpecification(name, value, item_id);
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Specification created successfully',
            payload: specification
        });
    }

    async updateSpecification(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid specification ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateSpecification(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, value, item_id } = data;
        if (item_id) {
            const [item] = await pool.execute('SELECT id FROM item WHERE id = ? AND deleted_at IS NULL', [item_id]);
            if (!item.length) {
                throw new ApiError('Invalid item ID: referenced row does not exist', StatusCodes.BAD_REQUEST);
            }
        }
        const specification = await SpecificationsRepository.updateSpecification(parsedId, name, value, item_id);
        if (!specification) {
            throw new ApiError('Specification not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Specification updated successfully',
            payload: specification
        });
    }

    async deleteSpecification(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid specification ID', StatusCodes.BAD_REQUEST);
        }
        const success = await SpecificationsRepository.deleteSpecification(parsedId);
        if (!success) {
            throw new ApiError('Specification not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Specification soft deleted successfully',
            payload: { message: 'Specification soft deleted successfully' }
        });
    }
}

module.exports = new SpecificationsService();