const Joi = require('joi');

const createStatusSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Status name is required',
            'string.min': 'Status name must be at least 1 character long',
            'string.max': 'Status name must not exceed 100 characters',
            'any.required': 'Status name is required',
        }),
    value: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Status value is required',
            'string.min': 'Status value must be at least 1 character long',
            'any.required': 'Status value is required',
        }),
});

const updateStatusSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Status name is required',
            'string.min': 'Status name must be at least 1 character long',
            'string.max': 'Status name must not exceed 100 characters',
            'any.required': 'Status name is required',
        }),
    value: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'Status value is required',
            'string.min': 'Status value must be at least 1 character long',
            'any.required': 'Status value is required',
        }),
});

const validateCreateStatus = (data) => createStatusSchema.validate(data, { abortEarly: false });
const validateUpdateStatus = (data) => updateStatusSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateStatus, validateUpdateStatus };