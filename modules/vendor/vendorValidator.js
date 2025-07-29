const Joi = require('joi');

const createVendorSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Vendor name is required',
            'string.min': 'Vendor name must be at least 1 character long',
            'string.max': 'Vendor name must not exceed 100 characters',
            'any.required': 'Vendor name is required',
        }),
    address: Joi.string()
        .trim()
        .min(1)
        .max(500)
        .required()
        .messages({
            'string.empty': 'Address is required',
            'string.min': 'Address must be at least 1 character long',
            'string.max': 'Address must not exceed 500 characters',
            'any.required': 'Address is required',
        }),
    phone: Joi.string()
        .trim()
        .min(1)
        .max(20)
        .pattern(/^\+?\d[\d\s-]*$/)
        .required()
        .messages({
            'string.empty': 'Phone number is required',
            'string.min': 'Phone number must be at least 1 character long',
            'string.max': 'Phone number must not exceed 20 characters',
            'string.pattern': 'Phone number must be valid (e.g., +1234567890 or 123-456-7890)',
            'any.required': 'Phone number is required',
        }),
    email: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.min': 'Email must be at least 1 character long',
            'string.max': 'Email must not exceed 100 characters',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
        }),
    banking_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.positive': 'Banking ID must be a positive number',
            'any.required': 'Banking ID is required',
        }),
});

const updateVendorSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Vendor name is required',
            'string.min': 'Vendor name must be at least 1 character long',
            'string.max': 'Vendor name must not exceed 100 characters',
            'any.required': 'Vendor name is required',
        }),
    address: Joi.string()
        .trim()
        .min(1)
        .max(500)
        .required()
        .messages({
            'string.empty': 'Address is required',
            'string.min': 'Address must be at least 1 character long',
            'string.max': 'Address must not exceed 500 characters',
            'any.required': 'Address is required',
        }),
    phone: Joi.string()
        .trim()
        .min(1)
        .max(20)
        .pattern(/^\+?\d[\d\s-]*$/)
        .required()
        .messages({
            'string.empty': 'Phone number is required',
            'string.min': 'Phone number must be at least 1 character long',
            'string.max': 'Phone number must not exceed 20 characters',
            'string.pattern': 'Phone number must be valid (e.g., +1234567890 or 123-456-7890)',
            'any.required': 'Phone number is required',
        }),
    email: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.min': 'Email must be at least 1 character long',
            'string.max': 'Email must not exceed 100 characters',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
        }),
    banking_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.positive': 'Banking ID must be a positive number',
            'any.required': 'Banking ID is required',
        }),
});

const validateCreateVendor = (data) => createVendorSchema.validate(data, { abortEarly: false });
const validateUpdateVendor = (data) => updateVendorSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateVendor, validateUpdateVendor };