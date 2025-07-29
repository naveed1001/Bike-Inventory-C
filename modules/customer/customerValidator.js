const Joi = require('joi');

const createCustomerSchema = Joi.object({
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
    email: Joi.string()
        .trim()
        .email()
        .max(100)
        .allow(null)
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.max': 'Email must not exceed 100 characters',
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
    cnic: Joi.string()
        .trim()
        .max(20)
        .allow(null)
        .messages({
            'string.max': 'CNIC must not exceed 20 characters',
        }),
});

const updateCustomerSchema = Joi.object({
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
    email: Joi.string()
        .trim()
        .email()
        .max(100)
        .allow(null)
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.max': 'Email must not exceed 100 characters',
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
    cnic: Joi.string()
        .trim()
        .max(20)
        .allow(null)
        .messages({
            'string.max': 'CNIC must not exceed 20 characters',
        }),
});

const validateCreateCustomer = (data) => createCustomerSchema.validate(data, { abortEarly: false });
const validateUpdateCustomer = (data) => updateCustomerSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateCustomer, validateUpdateCustomer };