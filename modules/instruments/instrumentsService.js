const { validateCreateInstrument, validateUpdateInstrument } = require('./instrumentsValidator');
const { ApiError, ApiResponse } = require('../../utils');
const InstrumentsRepository = require('./instrumentsRepository');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const fs = require('fs');

class InstrumentsService {
    async getAllInstruments() {
        const instruments = await InstrumentsRepository.findAllInstruments();
        if (!instruments) {
            throw new ApiError('Failed to retrieve instruments', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Instruments retrieved successfully',
            payload: { instruments }
        });
    }

    async getInstrumentById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid instrument ID', StatusCodes.BAD_REQUEST);
        }
        const instrument = await InstrumentsRepository.findInstrumentById(parsedId);
        if (!instrument) {
            throw new ApiError('Instrument not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Instrument retrieved successfully',
            payload: instrument
        });
    }

    async createInstrument(data, file) {
        const { error } = validateCreateInstrument(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { number, amount, date } = data;
        let picture = data.picture || null;

        if (file) {
            picture = path.join('uploads', 'instruments', file.filename).replace(/\\/g, '/');
        }

        const instrument = await InstrumentsRepository.createInstrument(number, amount, date, picture);
        if (!instrument && file && picture) {
            fs.unlinkSync(path.join(__dirname, '..', '..', picture));
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Instrument created successfully',
            payload: instrument
        });
    }

    async updateInstrument(id, data, file) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid instrument ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateInstrument(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { number, amount, date } = data;
        let picture = data.picture || null;

        const existingInstrument = await InstrumentsRepository.findInstrumentById(parsedId);
        if (!existingInstrument) {
            if (file) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'uploads', 'instruments', file.filename));
            }
            throw new ApiError('Instrument not found', StatusCodes.NOT_FOUND);
        }

        if (file) {
            picture = path.join('uploads', 'instruments', file.filename).replace(/\\/g, '/');
            if (existingInstrument.picture) {
                fs.unlinkSync(path.join(__dirname, '..', '..', existingInstrument.picture));
            }
        }

        const instrument = await InstrumentsRepository.updateInstrument(parsedId, number, amount, date, picture);
        if (!instrument) {
            if (file && picture) {
                fs.unlinkSync(path.join(__dirname, '..', '..', picture));
            }
            throw new ApiError('Instrument not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Instrument updated successfully',
            payload: instrument
        });
    }

    async deleteInstrument(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid instrument ID', StatusCodes.BAD_REQUEST);
        }
        const instrument = await InstrumentsRepository.findInstrumentById(parsedId);
        if (!instrument) {
            throw new ApiError('Instrument not found', StatusCodes.NOT_FOUND);
        }

        const success = await InstrumentsRepository.deleteInstrument(parsedId);
        if (!success) {
            throw new ApiError('Instrument not found', StatusCodes.NOT_FOUND);
        }

        if (instrument.picture) {
            fs.unlinkSync(path.join(__dirname, '..', '..', instrument.picture));
        }

        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Instrument soft deleted successfully',
            payload: { message: 'Instrument soft deleted successfully' }
        });
    }
}

module.exports = new InstrumentsService();