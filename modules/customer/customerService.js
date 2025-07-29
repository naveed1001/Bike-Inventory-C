const { validateCreateCustomer, validateUpdateCustomer } = require('./customerValidator');
const { ApiError, ApiResponse } = require('../../utils');
const CustomerRepository = require('./customerRepository');
const { StatusCodes } = require('http-status-codes');

class CustomerService {
    async getAllCustomers() {
        const customers = await CustomerRepository.findAllCustomers();
        if (!customers) {
            throw new ApiError('Failed to retrieve customers', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Customers retrieved successfully',
            payload: { customers }
        });
    }

    async getCustomerById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid customer ID', StatusCodes.BAD_REQUEST);
        }
        const customer = await CustomerRepository.findCustomerById(parsedId);
        if (!customer) {
            throw new ApiError('Customer not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Customer retrieved successfully',
            payload: customer
        });
    }

    async createCustomer(data) {
        const { error } = validateCreateCustomer(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, email, phone, address, cnic } = data;
        const customer = await CustomerRepository.createCustomer(name, email, phone, address, cnic);
        if (customer === 'Email already in use') {
            throw new ApiError('Email already in use', StatusCodes.BAD_REQUEST);
        }
        if (customer === 'CNIC already in use') {
            throw new ApiError('CNIC already in use', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Customer created successfully',
            payload: customer
        });
    }

    async updateCustomer(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid customer ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateCustomer(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, email, phone, address, cnic } = data;
        const customer = await CustomerRepository.updateCustomer(parsedId, name, email, phone, address, cnic);
        if (!customer) {
            throw new ApiError('Customer not found', StatusCodes.NOT_FOUND);
        }
        if (customer === 'Email already in use') {
            throw new ApiError('Email already in use', StatusCodes.BAD_REQUEST);
        }
        if (customer === 'CNIC already in use') {
            throw new ApiError('CNIC already in use', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Customer updated successfully',
            payload: customer
        });
    }

    async deleteCustomer(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid customer ID', StatusCodes.BAD_REQUEST);
        }
        const success = await CustomerRepository.deleteCustomer(parsedId);
        if (!success) {
            throw new ApiError('Customer not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Customer soft deleted successfully',
            payload: { message: 'Customer soft deleted successfully' }
        });
    }
}

module.exports = new CustomerService();