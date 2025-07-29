const Joi = require('joi');

const createShippingAgentSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(200)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 1 character long',
            'string.max': 'Name must not exceed 200 characters',
            'any.required': 'Name is required',
        }),
    address: Joi.string()
        .trim()
        .max(1000)
        .allow(null)
        .messages({
            'string.max': 'Address must not exceed 1000 characters',
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
        .max(200)
        .allow(null)
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.max': 'Email must not exceed 200 characters',
        }),
    country_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Country ID must be a number',
            'number.integer': 'Country ID must be an integer',
            'number.min': 'Country ID must be at least 1',
        }),
    city_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'City ID must be a number',
            'number.integer': 'City ID must be an integer',
            'number.min': 'City ID must be at least 1',
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
    banking_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.min': 'Banking ID must be at least 1',
        }),
});

const updateShippingAgentSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(200)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 1 character long',
            'string.max': 'Name must not exceed 200 characters',
            'any.required': 'Name is required',
        }),
    address: Joi.string()
        .trim()
        .max(500)
        .allow(null)
        .messages({
            'string.max': 'Address must not exceed 500 characters',
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
        .max(200)
        .allow(null)
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.max': 'Email must not exceed 200 characters',
        }),
    country_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Country ID must be a number',
            'number.integer': 'Country ID must be an integer',
            'number.min': 'Country ID must be at least 1',
        }),
    city_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'City ID must be a number',
            'number.integer': 'City ID must be an integer',
            'number.min': 'City ID must be at least 1',
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
    banking_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.min': 'Banking ID must be at least 1',
        }),
});

const validateCreateShippingAgent = (data) => createShippingAgentSchema.validate(data, { abortEarly: false });
const validateUpdateShippingAgent = (data) => updateShippingAgentSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateShippingAgent, validateUpdateShippingAgent };