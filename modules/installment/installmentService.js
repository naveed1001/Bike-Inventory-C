const { validateCreateInstallment, validateUpdateInstallment } = require('./installmentValidator');
const { ApiError, ApiResponse } = require('../../utils');
const InstallmentRepository = require('./installmentRepository');
const { StatusCodes } = require('http-status-codes');

class InstallmentService {
    async getAllInstallments() {
        const installments = await InstallmentRepository.findAllInstallments();
        if (!installments) {
            throw new ApiError('Failed to retrieve installments', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Installments retrieved successfully',
            payload: { installments }
        });
    }

    async getInstallmentById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid installment ID', StatusCodes.BAD_REQUEST);
        }
        const installment = await InstallmentRepository.findInstallmentById(parsedId);
        if (!installment) {
            throw new ApiError('Installment not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Installment retrieved successfully',
            payload: installment
        });
    }

    async createInstallment(data) {
        const { error } = validateCreateInstallment(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { installment_plan_id, instrument_id, amount, remarks } = data;
        const installment = await InstallmentRepository.createInstallment(installment_plan_id, instrument_id, amount, remarks);
        if (installment === 'Installment plan not found') {
            throw new ApiError('Invalid installment plan ID', StatusCodes.BAD_REQUEST);
        }
        if (installment === 'Instrument not found') {
            throw new ApiError('Invalid instrument ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Installment created successfully',
            payload: installment
        });
    }

    async updateInstallment(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid installment ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateInstallment(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { installment_plan_id, instrument_id, amount, remarks } = data;
        const installment = await InstallmentRepository.updateInstallment(parsedId, installment_plan_id, instrument_id, amount, remarks);
        if (!installment) {
            throw new ApiError('Installment not found', StatusCodes.NOT_FOUND);
        }
        if (installment === 'Installment plan not found') {
            throw new ApiError('Invalid installment plan ID', StatusCodes.BAD_REQUEST);
        }
        if (installment === 'Instrument not found') {
            throw new ApiError('Invalid instrument ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Installment updated successfully',
            payload: installment
        });
    }

    async deleteInstallment(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid installment ID', StatusCodes.BAD_REQUEST);
        }
        const success = await InstallmentRepository.deleteInstallment(parsedId);
        if (!success) {
            throw new ApiError('Installment not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Installment soft deleted successfully',
            payload: { message: 'Installment soft deleted successfully' }
        });
    }
}

module.exports = new InstallmentService();