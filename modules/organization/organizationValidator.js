const Joi = require('joi');

const createOrganizationSchema = Joi.object({
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
    logo: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Logo URL must not exceed 255 characters',
        }),
    website: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Website URL must not exceed 255 characters',
        }),
    address: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Address must not exceed 255 characters',
        }),
    vendor_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': 'Vendor ID must be a number',
            'number.integer': 'Vendor ID must be an integer',
            'number.positive': 'Vendor ID must be a positive number',
        }),
    admin_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': 'Admin ID must be a number',
            'number.integer': 'Admin ID must be an integer',
            'number.positive': 'Admin ID must be a positive number',
        }),
    banking_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.positive': 'Banking ID must be a positive number',
        }),
});

const updateOrganizationSchema = Joi.object({
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
    logo: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Logo URL must not exceed 255 characters',
        }),
    website: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Website URL must not exceed 255 characters',
        }),
    address: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .optional()
        .messages({
            'string.max': 'Address must not exceed 255 characters',
        }),
    vendor_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': 'Vendor ID must be a number',
            'number.integer': 'Vendor ID must be an integer',
            'number.positive': 'Vendor ID must be a positive number',
        }),
    admin_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': 'Admin ID must be a number',
            'number.integer': 'Admin ID must be an integer',
            'number.positive': 'Admin ID must be a positive number',
        }),
    banking_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .optional()
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.positive': 'Banking ID must be a positive number',
        }),
});

const validateCreateOrganization = (data) => createOrganizationSchema.validate(data, { abortEarly: false });
const validateUpdateOrganization = (data) => updateOrganizationSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateOrganization, validateUpdateOrganization };