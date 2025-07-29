const { validateCreateShippingAgent, validateUpdateShippingAgent } = require('./shippingAgentValidator');
const { ApiError, ApiResponse } = require('../../utils');
const ShippingAgentRepository = require('./shippingAgentRepository');
const { StatusCodes } = require('http-status-codes');

class ShippingAgentService {
    async getAllShippingAgents() {
        const shippingAgents = await ShippingAgentRepository.findAllShippingAgents();
        if (!shippingAgents) {
            throw new ApiError('Failed to retrieve shipping agents', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Shipping agents retrieved successfully',
            payload: { shippingAgents }
        });
    }

    async getShippingAgentById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid shipping agent ID', StatusCodes.BAD_REQUEST);
        }
        const shippingAgent = await ShippingAgentRepository.findShippingAgentById(parsedId);
        if (!shippingAgent) {
            throw new ApiError('Shipping agent not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Shipping agent retrieved successfully',
            payload: shippingAgent
        });
    }

    async createShippingAgent(data) {
        const { error } = validateCreateShippingAgent(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, address, phone, email, country_id, city_id, organization_id, banking_id } = data;
        const shippingAgent = await ShippingAgentRepository.createShippingAgent(name, address, phone, email, country_id, city_id, organization_id, banking_id);
        if (shippingAgent === 'Country not found') {
            throw new ApiError('Invalid country ID', StatusCodes.BAD_REQUEST);
        }
        if (shippingAgent === 'City not found') {
            throw new ApiError('Invalid city ID', StatusCodes.BAD_REQUEST);
        }
        if (shippingAgent === 'Organization not found') {
            throw new ApiError('Invalid organization ID', StatusCodes.BAD_REQUEST);
        }
        if (shippingAgent === 'Banking details not found') {
            throw new ApiError('Invalid banking details ID', StatusCodes.BAD_REQUEST);
        }
        if (shippingAgent === 'Email already in use') {
            throw new ApiError('Email already in use', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Shipping agent created successfully',
            payload: shippingAgent
        });
    }

    async updateShippingAgent(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid shipping agent ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateShippingAgent(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, address, phone, email, country_id, city_id, organization_id, banking_id } = data;
        const shippingAgent = await ShippingAgentRepository.updateShippingAgent(parsedId, name, address, phone, email, country_id, city_id, organization_id, banking_id);
        if (!shippingAgent) {
            throw new ApiError('Shipping agent not found', StatusCodes.NOT_FOUND);
        }
        if (shippingAgent === 'Country not found') {
            throw new ApiError('Invalid country ID', StatusCodes.BAD_REQUEST);
        }
        if (shippingAgent === 'City not found') {
            throw new ApiError('Invalid city ID', StatusCodes.BAD_REQUEST);
        }
        if (shippingAgent === 'Organization not found') {
            throw new ApiError('Invalid organization ID', StatusCodes.BAD_REQUEST);
        }
        if (shippingAgent === 'Banking details not found') {
            throw new ApiError('Invalid banking details ID', StatusCodes.BAD_REQUEST);
        }
        if (shippingAgent === 'Email already in use') {
            throw new ApiError('Email already in use', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Shipping agent updated successfully',
            payload: shippingAgent
        });
    }

    async deleteShippingAgent(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid shipping agent ID', StatusCodes.BAD_REQUEST);
        }
        const success = await ShippingAgentRepository.deleteShippingAgent(parsedId);
        if (!success) {
            throw new ApiError('Shipping agent not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Shipping agent soft deleted successfully',
            payload: { message: 'Shipping agent soft deleted successfully' }
        });
    }
}

module.exports = new ShippingAgentService();