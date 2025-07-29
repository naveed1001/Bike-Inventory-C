const Joi = require('joi');

const createDealerSchema = Joi.object({
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
    phone: Joi.string()
        .trim()
        .max(20)
        .allow(null)
        .messages({
            'string.max': 'Phone must not exceed 20 characters',
        }),
    email: Joi.string()
        .trim()
        .email()
        .max(100)
        .allow(null)
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.max': 'Email must not exceed 100 characters',
        }),
    address: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Address must not exceed 255 characters',
        }),
    brand_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Brand ID must be a number',
            'number.integer': 'Brand ID must be an integer',
            'number.min': 'Brand ID must be at least 1',
        }),
    banking_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.min': 'Banking ID must be at least 1',
        }),
    organization_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Organization ID must be a number',
            'number.integer': 'Organization ID must be an integer',
            'number.min': 'Organization ID must be at least 1',
        }),
});

const updateDealerSchema = Joi.object({
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
    phone: Joi.string()
        .trim()
        .max(20)
        .allow(null)
        .messages({
            'string.max': 'Phone must not exceed 20 characters',
        }),
    email: Joi.string()
        .trim()
        .email()
        .max(100)
        .allow(null)
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.max': 'Email must not exceed 100 characters',
        }),
    address: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Address must not exceed 255 characters',
        }),
    brand_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Brand ID must be a number',
            'number.integer': 'Brand ID must be an integer',
            'number.min': 'Brand ID must be at least 1',
        }),
    banking_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.min': 'Banking ID must be at least 1',
        }),
    organization_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Organization ID must be a number',
            'number.integer': 'Organization ID must be an integer',
            'number.min': 'Organization ID must be at least 1',
        }),
});

const validateCreateDealer = (data) => createDealerSchema.validate(data, { abortEarly: false });
const validateUpdateDealer = (data) => updateDealerSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateDealer, validateUpdateDealer };