const { validateCreateSale, validateUpdateSale } = require('./salesValidator');
const { ApiError, ApiResponse } = require('../../utils');
const SalesRepository = require('./salesRepository');
const { StatusCodes } = require('http-status-codes');

class SalesService {
    async getAllSales() {
        const sales = await SalesRepository.findAllSales();
        if (!sales) {
            throw new ApiError('Failed to retrieve sales', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Sales retrieved successfully',
            payload: { sales }
        });
    }

    async getSaleById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid sale ID', StatusCodes.BAD_REQUEST);
        }
        const sale = await SalesRepository.findSaleById(parsedId);
        if (!sale) {
            throw new ApiError('Sale not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Sale retrieved successfully',
            payload: sale
        });
    }

    async createSale(data) {
        const { error } = validateCreateSale(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { item_id, customer_id, dealer_id, payment_id } = data;
        const sale = await SalesRepository.createSale(item_id, customer_id, dealer_id, payment_id);
        if (sale === 'Item not found') {
            throw new ApiError('Invalid item ID', StatusCodes.BAD_REQUEST);
        }
        if (sale === 'Customer not found') {
            throw new ApiError('Invalid customer ID', StatusCodes.BAD_REQUEST);
        }
        if (sale === 'Dealer not found') {
            throw new ApiError('Invalid dealer ID', StatusCodes.BAD_REQUEST);
        }
        if (sale === 'Payment not found') {
            throw new ApiError('Invalid payment ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Sale created successfully',
            payload: sale
        });
    }

    async updateSale(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid sale ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateSale(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { item_id, customer_id, dealer_id, payment_id } = data;
        const sale = await SalesRepository.updateSale(parsedId, item_id, customer_id, dealer_id, payment_id);
        if (!sale) {
            throw new ApiError('Sale not found', StatusCodes.NOT_FOUND);
        }
        if (sale === 'Item not found') {
            throw new ApiError('Invalid item ID', StatusCodes.BAD_REQUEST);
        }
        if (sale === 'Customer not found') {
            throw new ApiError('Invalid customer ID', StatusCodes.BAD_REQUEST);
        }
        if (sale === 'Dealer not found') {
            throw new ApiError('Invalid dealer ID', StatusCodes.BAD_REQUEST);
        }
        if (sale === 'Payment not found') {
            throw new ApiError('Invalid payment ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Sale updated successfully',
            payload: sale
        });
    }

    async deleteSale(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid sale ID', StatusCodes.BAD_REQUEST);
        }
        const success = await SalesRepository.deleteSale(parsedId);
        if (!success) {
            throw new ApiError('Sale not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Sale soft deleted successfully',
            payload: { message: 'Sale soft deleted successfully' }
        });
    }
}

module.exports = new SalesService();