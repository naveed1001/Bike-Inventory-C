const { validateCreateInstallmentPlan, validateUpdateInstallmentPlan } = require('./installmentPlanValidator');
const { ApiError, ApiResponse } = require('../../utils');
const InstallmentPlanRepository = require('./installmentPlanRepository');
const { StatusCodes } = require('http-status-codes');

class InstallmentPlanService {
    async getAllInstallmentPlans() {
        const installmentPlans = await InstallmentPlanRepository.findAllInstallmentPlans();
        if (!installmentPlans) {
            throw new ApiError('Failed to retrieve installment plans', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Installment plans retrieved successfully',
            payload: { installmentPlans }
        });
    }

    async getInstallmentPlanById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid installment plan ID', StatusCodes.BAD_REQUEST);
        }
        const installmentPlan = await InstallmentPlanRepository.findInstallmentPlanById(parsedId);
        if (!installmentPlan) {
            throw new ApiError('Installment plan not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Installment plan retrieved successfully',
            payload: installmentPlan
        });
    }

    async createInstallmentPlan(data) {
        const { error } = validateCreateInstallmentPlan(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, advance_amount, tenure, installment_amount } = data;
        const installmentPlan = await InstallmentPlanRepository.createInstallmentPlan(name, advance_amount, tenure, installment_amount);
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Installment plan created successfully',
            payload: installmentPlan
        });
    }

    async updateInstallmentPlan(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid installment plan ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateInstallmentPlan(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, advance_amount, tenure, installment_amount } = data;
        const installmentPlan = await InstallmentPlanRepository.updateInstallmentPlan(parsedId, name, advance_amount, tenure, installment_amount);
        if (!installmentPlan) {
            throw new ApiError('Installment plan not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Installment plan updated successfully',
            payload: installmentPlan
        });
    }

    async deleteInstallmentPlan(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid installment plan ID', StatusCodes.BAD_REQUEST);
        }
        const success = await InstallmentPlanRepository.deleteInstallmentPlan(parsedId);
        if (!success) {
            throw new ApiError('Installment plan not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Installment plan soft deleted successfully',
            payload: { message: 'Installment plan soft deleted successfully' }
        });
    }
}

module.exports = new InstallmentPlanService();