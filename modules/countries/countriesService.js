const { validateCreateCountry, validateUpdateCountry } = require('./countriesValidator');
const { ApiError, ApiResponse } = require('../../utils');
const CountriesRepository = require('./countriesRepository');
const { StatusCodes } = require("http-status-codes");

class CountriesService {
    async getAllCountries() {
        const countries = await CountriesRepository.findAll();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Countries retrieved successfully',
            payload: countries,
        });
    }

    async getCountryById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid country ID', StatusCodes.BAD_REQUEST);
        }
        const country = await CountriesRepository.findById(parsedId);
        if (!country) {
            throw new ApiError('Country not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Country retrieved successfully',
            payload: country,
        });
    }

    async createCountry(data) {
        const { error } = validateCreateCountry(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name } = data;
        const country = await CountriesRepository.create({ name });
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Country created successfully',
            payload: country,
        });
    }

    async updateCountry(id, data) {
        const { error } = validateUpdateCountry(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid country ID', StatusCodes.BAD_REQUEST);
        }
        const { name } = data;
        const country = await CountriesRepository.update(parsedId, { name });
        if (!country) {
            throw new ApiError('Country not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Country updated successfully',
            payload: country,
        });
    }

    async deleteCountry(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid country ID', StatusCodes.BAD_REQUEST);
        }
        const success = await CountriesRepository.delete(parsedId);
        if (!success) {
            throw new ApiError('Country not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Country soft deleted successfully',
            payload: { message: 'Country soft deleted successfully' },
        });
    }
}

module.exports = new CountriesService();