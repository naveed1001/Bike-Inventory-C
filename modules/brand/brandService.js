const { validateCreateBrand, validateUpdateBrand } = require('./brandValidator');
const { ApiError, ApiResponse } = require('../../utils');
const BrandRepository = require('./brandRepository');
const { StatusCodes } = require('http-status-codes');

class BrandService {
    async getAllBrands() {
        const brands = await BrandRepository.findAllBrands();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Brands retrieved successfully',
            payload: brands,
        });
    }

    async getBrandById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid brand ID', StatusCodes.BAD_REQUEST);
        }
        const brand = await BrandRepository.findBrandById(parsedId);
        if (!brand) {
            throw new ApiError('Brand not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Brand retrieved successfully',
            payload: brand,
        });
    }

    async createBrand(data, file) {
        const { name, website } = data;
        const logoPath = file ? file.path : null;
        const validationData = { name, website };
        const { error } = validateCreateBrand(validationData);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const brand = await BrandRepository.createBrand(name, logoPath, website);
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Brand created successfully',
            payload: brand,
        });
    }

    async updateBrand(id, data, file) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid brand ID', StatusCodes.BAD_REQUEST);
        }
        const { name, website } = data;
        const logoPath = file ? file.path : null;
        const validationData = { name, website };
        const { error } = validateUpdateBrand(validationData);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const brand = await BrandRepository.updateBrand(parsedId, name, logoPath, website);
        if (!brand) {
            throw new ApiError('Brand not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Brand updated successfully',
            payload: brand,
        });
    }

    async deleteBrand(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid brand ID', StatusCodes.BAD_REQUEST);
        }
        const success = await BrandRepository.deleteBrand(parsedId);
        if (!success) {
            throw new ApiError('Brand not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Brand soft deleted successfully',
            payload: { message: 'Brand soft deleted successfully' },
        });
    }
}

module.exports = new BrandService();