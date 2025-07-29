const Joi = require('joi');

const createWarehouseSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 1 character long',
            'string.max': 'Name must not exceed 100 characters',
            'any.required': 'Name is required',
        }),
    organization_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': 'Organization ID must be a number',
            'number.integer': 'Organization ID must be an integer',
            'number.positive': 'Organization ID must be a positive number',
        }),
    address: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Address must not exceed 255 characters',
        }),
    area: Joi.string()
        .trim()
        .max(100)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Area must not exceed 100 characters',
        }),
    location: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Location must not exceed 255 characters',
        }),
});

const updateWarehouseSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 1 character long',
            'string.max': 'Name must not exceed 100 characters',
            'any.required': 'Name is required',
        }),
    organization_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': 'Organization ID must be a number',
            'number.integer': 'Organization ID must be an integer',
            'number.positive': 'Organization ID must be a positive number',
        }),
    address: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Address must not exceed 255 characters',
        }),
    area: Joi.string()
        .trim()
        .max(100)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Area must not exceed 100 characters',
        }),
    location: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Location must not exceed 255 characters',
        }),
});

const validateCreateWarehouse = (data) => createWarehouseSchema.validate(data, { abortEarly: false });
const validateUpdateWarehouse = (data) => updateWarehouseSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateWarehouse, validateUpdateWarehouse };