const { validateCreatePayment, validateUpdatePayment } = require('./paymentValidator');
const { ApiError, ApiResponse } = require('../../utils');
const PaymentRepository = require('./paymentRepository');
const { StatusCodes } = require('http-status-codes');

class PaymentService {
    async getAllPayments() {
        const payments = await PaymentRepository.findAllPayments();
        if (!payments) {
            throw new ApiError('Failed to retrieve payments', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Payments retrieved successfully',
            payload: { payments }
        });
    }

    async getPaymentById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid payment ID', StatusCodes.BAD_REQUEST);
        }
        const payment = await PaymentRepository.findPaymentById(parsedId);
        if (!payment) {
            throw new ApiError('Payment not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Payment retrieved successfully',
            payload: payment
        });
    }

    async createPayment(data) {
        const { error } = validateCreatePayment(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { nature, type, amount, payee, beneficiary } = data;
        const payment = await PaymentRepository.createPayment(nature, type, amount, payee, beneficiary);
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Payment created successfully',
            payload: payment
        });
    }

    async updatePayment(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid payment ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdatePayment(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { nature, type, amount, payee, beneficiary } = data;
        const payment = await PaymentRepository.updatePayment(parsedId, nature, type, amount, payee, beneficiary);
        if (!payment) {
            throw new ApiError('Payment not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Payment updated successfully',
            payload: payment
        });
    }

    async deletePayment(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid payment ID', StatusCodes.BAD_REQUEST);
        }
        const success = await PaymentRepository.deletePayment(parsedId);
        if (!success) {
            throw new ApiError('Payment not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Payment soft deleted successfully',
            payload: { message: 'Payment soft deleted successfully' }
        });
    }
}

module.exports = new PaymentService();