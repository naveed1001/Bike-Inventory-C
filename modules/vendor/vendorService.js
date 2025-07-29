const { validateCreateVendor, validateUpdateVendor } = require('./vendorValidator');
const { ApiError, ApiResponse } = require('../../utils');
const VendorRepository = require('./vendorRepository');
const { StatusCodes } = require('http-status-codes');

class VendorService {
    async getAllVendors() {
        const vendors = await VendorRepository.findAllVendors();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Vendors retrieved successfully',
            payload: vendors
        });
    }

    async getVendorById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid vendor ID', StatusCodes.BAD_REQUEST);
        }
        const vendor = await VendorRepository.findVendorById(parsedId);
        if (!vendor) {
            throw new ApiError('Vendor not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Vendor retrieved successfully',
            payload: vendor
        });
    }

    async createVendor(data) {
        const { error } = validateCreateVendor(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, address, phone, email, banking_id } = data;
        const vendor = await VendorRepository.createVendor(name, address, phone, email, banking_id);
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Vendor created successfully',
            payload: vendor
        });
    }

    async updateVendor(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid vendor ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateVendor(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, address, phone, email, banking_id } = data;
        const vendor = await VendorRepository.updateVendor(parsedId, name, address, phone, email, banking_id);
        if (!vendor) {
            throw new ApiError('Vendor not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Vendor updated successfully',
            payload: vendor
        });
    }

    async deleteVendor(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid vendor ID', StatusCodes.BAD_REQUEST);
        }
        const success = await VendorRepository.deleteVendor(parsedId);
        if (!success) {
            throw new ApiError('Vendor not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Vendor soft deleted successfully',
            payload: { message: 'Vendor soft deleted successfully' }
        });
    }
}

module.exports = new VendorService();