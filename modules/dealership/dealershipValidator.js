const Joi = require('joi');

const createDealershipSchema = Joi.object({
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
    address: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Address must not exceed 255 characters',
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
    website: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Website must not exceed 255 characters',
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
    dealer_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Dealer ID must be a number',
            'number.integer': 'Dealer ID must be an integer',
            'number.min': 'Dealer ID must be at least 1',
        }),
});

const updateDealershipSchema = Joi.object({
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
    address: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Address must not exceed 255 characters',
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
    website: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Website must not exceed 255 characters',
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
    dealer_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Dealer ID must be a number',
            'number.integer': 'Dealer ID must be an integer',
            'number.min': 'Dealer ID must be at least 1',
        }),
});

const validateCreateDealership = (data) => createDealershipSchema.validate(data, { abortEarly: false });
const validateUpdateDealership = (data) => updateDealershipSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateDealership, validateUpdateDealership };