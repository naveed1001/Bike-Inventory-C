const { validateCreateEntityBanking, validateUpdateEntityBanking } = require('./entityBankingValidator');
const { ApiError, ApiResponse } = require('../../utils');
const EntityBankingRepository = require('./entityBankingRepository');
const { StatusCodes } = require('http-status-codes');

class EntityBankingService {
    async getAllEntityBankings() {
        const entityBankings = await EntityBankingRepository.findAllEntityBankings();
        if (!entityBankings) {
            throw new ApiError('Failed to retrieve entity bankings', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Entity bankings retrieved successfully',
            payload: { entityBankings }
        });
    }

    async getEntityBankingById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid entity banking ID', StatusCodes.BAD_REQUEST);
        }
        const entityBanking = await EntityBankingRepository.findEntityBankingById(parsedId);
        if (!entityBanking) {
            throw new ApiError('Entity banking not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Entity banking retrieved successfully',
            payload: entityBanking
        });
    }

    async createEntityBanking(data) {
        const { error } = validateCreateEntityBanking(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { entity_type, entity_id, banking_id } = data;
        const entityBanking = await EntityBankingRepository.createEntityBanking(entity_type, entity_id, banking_id);
        if (entityBanking === 'Banking details not found') {
            throw new ApiError('Invalid banking ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Entity banking created successfully',
            payload: entityBanking
        });
    }

    async updateEntityBanking(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid entity banking ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateEntityBanking(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { entity_type, entity_id, banking_id } = data;
        const entityBanking = await EntityBankingRepository.updateEntityBanking(parsedId, entity_type, entity_id, banking_id);
        if (!entityBanking) {
            throw new ApiError('Entity banking not found', StatusCodes.NOT_FOUND);
        }
        if (entityBanking === 'Banking details not found') {
            throw new ApiError('Invalid banking ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Entity banking updated successfully',
            payload: entityBanking
        });
    }

    async deleteEntityBanking(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid entity banking ID', StatusCodes.BAD_REQUEST);
        }
        const success = await EntityBankingRepository.deleteEntityBanking(parsedId);
        if (!success) {
            throw new ApiError('Entity banking not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Entity banking soft deleted successfully',
            payload: { message: 'Entity banking soft deleted successfully' }
        });
    }
}

module.exports = new EntityBankingService();