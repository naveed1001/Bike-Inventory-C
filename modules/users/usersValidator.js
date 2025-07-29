const Joi = require('joi');

const createUserSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 1 character long',
            'string.max': 'Username must not exceed 50 characters',
            'any.required': 'Username is required',
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
    address: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': 'Address is required',
            'string.min': 'Address must be at least 1 character long',
            'string.max': 'Address must not exceed 255 characters',
            'any.required': 'Address is required',
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.empty': 'Password is required',
            'any.required': 'Password is required',
        }),
    role_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Role ID must be a number',
            'number.integer': 'Role ID must be an integer',
            'number.positive': 'Role ID must be a positive number',
            'any.required': 'Role ID is required',
        }),
    employed_at: Joi.date()
        .allow(null)
        .optional()
        .messages({
            'date.base': 'Employed at must be a valid date',
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

const updateUserSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 1 character long',
            'string.max': 'Username must not exceed 50 characters',
            'any.required': 'Username is required',
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
    address: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': 'Address is required',
            'string.min': 'Address must be at least 1 character long',
            'string.max': 'Address must not exceed 255 characters',
            'any.required': 'Address is required',
        }),
    password: Joi.string()
        .min(8)
        .allow(null, '')
        .optional()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
        }),
    role_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Role ID must be a number',
            'number.integer': 'Role ID must be an integer',
            'number.positive': 'Role ID must be a positive number',
            'any.required': 'Role ID is required',
        }),
    employed_at: Joi.date()
        .allow(null)
        .optional()
        .messages({
            'date.base': 'Employed at must be a valid date',
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

const loginUserSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 1 character long',
            'string.max': 'Username must not exceed 50 characters',
            'any.required': 'Username is required',
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.empty': 'Password is required',
            'any.required': 'Password is required',
        }),
});

const activateDeactivateUserSchema = Joi.object({
    isActive: Joi.boolean().required().messages({
        'any.required': 'isActive is required',
        'boolean.base': 'isActive must be a boolean'
    })
});

const validateCreateUser = (data) => createUserSchema.validate(data, { abortEarly: false });
const validateUpdateUser = (data) => updateUserSchema.validate(data, { abortEarly: false });
const validateLoginUser = (data) => loginUserSchema.validate(data, { abortEarly: false });
const validateActivateDeactivateUser = (data) => activateDeactivateUserSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateUser, validateUpdateUser, validateLoginUser, validateActivateDeactivateUser };