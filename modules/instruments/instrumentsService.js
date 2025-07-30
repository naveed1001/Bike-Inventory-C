const { validateCreateInstrument, validateUpdateInstrument } = require('./instrumentsValidator');
const { ApiError, ApiResponse } = require('../../utils');
const InstrumentsRepository = require('./instrumentsRepository');
const { StatusCodes } = require('http-status-codes');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Initialize S3 client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Utility function to extract S3 key from URL
const getS3KeyFromUrl = (url) => {
    if (!url) return null;
    const urlObj = new URL(url);
    return decodeURIComponent(urlObj.pathname.substring(1)); // Remove leading '/' from pathname
};

class InstrumentsService {
    async getAllInstruments() {
        const instruments = await InstrumentsRepository.findAllInstruments();
        const instrumentsWithPresignedUrls = await Promise.all(instruments.map(async (instrument) => {
            if (instrument.picture) {
                const key = getS3KeyFromUrl(instrument.picture);
                instrument.picturePresignedUrl = await getSignedUrl(s3, new GetObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: key,
                }), { expiresIn: 3600 });
            }
            return instrument;
        }));
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Instruments retrieved successfully',
            payload: { instruments: instrumentsWithPresignedUrls }
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
        if (instrument.picture) {
            const key = getS3KeyFromUrl(instrument.picture);
            instrument.picturePresignedUrl = await getSignedUrl(s3, new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key,
            }), { expiresIn: 3600 });
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
        const pictureUrl = file ? file.location : null;
        const picturePresignedUrl = file ? file.presignedUrl : null;

        const instrument = await InstrumentsRepository.createInstrument(number, amount, date, pictureUrl);
        instrument.picturePresignedUrl = picturePresignedUrl;

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
        const pictureUrl = file ? file.location : null;
        const picturePresignedUrl = file ? file.presignedUrl : null;

        const instrument = await InstrumentsRepository.updateInstrument(parsedId, number, amount, date, pictureUrl);
        if (!instrument) {
            throw new ApiError('Instrument not found', StatusCodes.NOT_FOUND);
        }
        instrument.picturePresignedUrl = picturePresignedUrl;

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

        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Instrument soft deleted successfully',
            payload: { message: 'Instrument soft deleted successfully' }
        });
    }
}

module.exports = new InstrumentsService();