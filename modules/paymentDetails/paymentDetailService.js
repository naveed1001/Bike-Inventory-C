const { validateCreatePaymentDetail, validateUpdatePaymentDetail } = require('./paymentDetailValidator');
const { ApiError, ApiResponse } = require('../../utils');
const PaymentDetailRepository = require('./paymentDetailRepository');
const { StatusCodes } = require('http-status-codes');

class PaymentDetailService {
    async getAllPaymentDetails() {
        const paymentDetails = await PaymentDetailRepository.findAllPaymentDetails();
        if (!paymentDetails) {
            throw new ApiError('Failed to retrieve payment details', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Payment details retrieved successfully',
            payload: { paymentDetails }
        });
    }

    async getPaymentDetailById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid payment detail ID', StatusCodes.BAD_REQUEST);
        }
        const paymentDetail = await PaymentDetailRepository.findPaymentDetailById(parsedId);
        if (!paymentDetail) {
            throw new ApiError('Payment detail not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Payment detail retrieved successfully',
            payload: paymentDetail
        });
    }

    async createPaymentDetail(data) {
        const { error } = validateCreatePaymentDetail(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { payment_id, installment_id, type, advance_amount, due_amount, due_date, paid_date, remarks } = data;
        const paymentDetail = await PaymentDetailRepository.createPaymentDetail(payment_id, installment_id, type, advance_amount, due_amount, due_date, paid_date, remarks);
        if (paymentDetail === 'Payment not found') {
            throw new ApiError('Invalid payment ID', StatusCodes.BAD_REQUEST);
        }
        if (paymentDetail === 'Installment not found') {
            throw new ApiError('Invalid installment ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Payment detail created successfully',
            payload: paymentDetail
        });
    }

    async updatePaymentDetail(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid payment detail ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdatePaymentDetail(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { payment_id, installment_id, type, advance_amount, due_amount, due_date, paid_date, remarks } = data;
        const paymentDetail = await PaymentDetailRepository.updatePaymentDetail(parsedId, payment_id, installment_id, type, advance_amount, due_amount, due_date, paid_date, remarks);
        if (!paymentDetail) {
            throw new ApiError('Payment detail not found', StatusCodes.NOT_FOUND);
        }
        if (paymentDetail === 'Payment not found') {
            throw new ApiError('Invalid payment ID', StatusCodes.BAD_REQUEST);
        }
        if (paymentDetail === 'Installment not found') {
            throw new ApiError('Invalid installment ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Payment detail updated successfully',
            payload: paymentDetail
        });
    }

    async deletePaymentDetail(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid payment detail ID', StatusCodes.BAD_REQUEST);
        }
        const success = await PaymentDetailRepository.deletePaymentDetail(parsedId);
        if (!success) {
            throw new ApiError('Payment detail not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Payment detail soft deleted successfully',
            payload: { message: 'Payment detail soft deleted successfully' }
        });
    }
}

module.exports = new PaymentDetailService();