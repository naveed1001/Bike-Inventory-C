const { validateCreateCity, validateUpdateCity } = require('./citiesValidator');
const { ApiError, ApiResponse } = require('../../utils');
const CitiesRepository = require('./citiesRepository');
const { StatusCodes } = require('http-status-codes');

class CitiesService {
    async getAllCities() {
        const cities = await CitiesRepository.findAllCities();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Cities retrieved successfully',
            payload: cities,
        });
    }

    async getCityById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid city ID', StatusCodes.BAD_REQUEST);
        }
        const city = await CitiesRepository.findCityById(parsedId);
        if (!city) {
            throw new ApiError('City not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'City retrieved successfully',
            payload: city,
        });
    }

    async createCity(data) {
        const { error } = validateCreateCity(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name } = data;
        const city = await CitiesRepository.createCity(name);
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'City created successfully',
            payload: city,
        });
    }

    async updateCity(id, data) {
        const { error } = validateUpdateCity(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid city ID', StatusCodes.BAD_REQUEST);
        }
        const { name } = data;
        const city = await CitiesRepository.updateCity(parsedId, name);
        if (!city) {
            throw new ApiError('City not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'City updated successfully',
            payload: city,
        });
    }

    async deleteCity(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid city ID', StatusCodes.BAD_REQUEST);
        }
        const success = await CitiesRepository.deleteCity(parsedId);
        if (!success) {
            throw new ApiError('City not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'City soft deleted successfully',
            payload: { message: 'City soft deleted successfully' },
        });
    }
}

module.exports = new CitiesService();