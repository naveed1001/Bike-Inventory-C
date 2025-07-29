const Joi = require('joi');

const createItemSchema = Joi.object({
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
    brand_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Brand ID must be a number',
            'number.integer': 'Brand ID must be an integer',
            'number.min': 'Brand ID must be at least 1',
            'any.required': 'Brand ID is required',
        }),
    model_number: Joi.string()
        .trim()
        .max(50)
        .allow(null)
        .messages({
            'string.max': 'Model number must not exceed 50 characters',
        }),
    identification_number: Joi.string()
        .trim()
        .max(50)
        .allow(null)
        .messages({
            'string.max': 'Identification number must not exceed 50 characters',
        }),
    color: Joi.string()
        .trim()
        .max(50)
        .allow(null)
        .messages({
            'string.max': 'Color must not exceed 50 characters',
        }),
    status_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Status ID must be a number',
            'number.integer': 'Status ID must be an integer',
            'number.min': 'Status ID must be at least 1',
            'any.required': 'Status ID is required',
        }),
    arrival_date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Arrival date must be a valid date',
        }),
    manufacturing_date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Manufacturing date must be a valid date',
        }),
    price: Joi.number()
        .precision(2)
        .min(0)
        .allow(null)
        .messages({
            'number.base': 'Price must be a number',
            'number.precision': 'Price must have up to 2 decimal places',
            'number.min': 'Price cannot be negative',
        }),
    discount: Joi.number()
        .precision(2)
        .min(0)
        .allow(null)
        .messages({
            'number.base': 'Discount must be a number',
            'number.precision': 'Discount must have up to 2 decimal places',
            'number.min': 'Discount cannot be negative',
        }),
    discount_coupon: Joi.string()
        .trim()
        .max(50)
        .allow(null)
        .messages({
            'string.max': 'Discount coupon must not exceed 50 characters',
        }),
    sold_to: Joi.string()
        .trim()
        .max(100)
        .allow(null)
        .messages({
            'string.max': 'Sold to must not exceed 100 characters',
        }),
    organization_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Organization ID must be a number',
            'number.integer': 'Organization ID must be an integer',
            'number.min': 'Organization ID must be at least 1',
            'any.required': 'Organization ID is required',
        }),
});

const updateItemSchema = Joi.object({
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
    brand_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Brand ID must be a number',
            'number.integer': 'Brand ID must be an integer',
            'number.min': 'Brand ID must be at least 1',
            'any.required': 'Brand ID is required',
        }),
    model_number: Joi.string()
        .trim()
        .max(50)
        .allow(null)
        .messages({
            'string.max': 'Model number must not exceed 50 characters',
        }),
    identification_number: Joi.string()
        .trim()
        .max(50)
        .allow(null)
        .messages({
            'string.max': 'Identification number must not exceed 50 characters',
        }),
    color: Joi.string()
        .trim()
        .max(50)
        .allow(null)
        .messages({
            'string.max': 'Color must not exceed 50 characters',
        }),
    status_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Status ID must be a number',
            'number.integer': 'Status ID must be an integer',
            'number.min': 'Status ID must be at least 1',
            'any.required': 'Status ID is required',
        }),
    arrival_date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Arrival date must be a valid date',
        }),
    manufacturing_date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Manufacturing date must be a valid date',
        }),
    price: Joi.number()
        .precision(2)
        .min(0)
        .allow(null)
        .messages({
            'number.base': 'Price must be a number',
            'number.precision': 'Price must have up to 2 decimal places',
            'number.min': 'Price cannot be negative',
        }),
    discount: Joi.number()
        .precision(2)
        .min(0)
        .allow(null)
        .messages({
            'number.base': 'Discount must be a number',
            'number.precision': 'Discount must have up to 2 decimal places',
            'number.min': 'Discount cannot be negative',
        }),
    discount_coupon: Joi.string()
        .trim()
        .max(50)
        .allow(null)
        .messages({
            'string.max': 'Discount coupon must not exceed 50 characters',
        }),
    sold_to: Joi.string()
        .trim()
        .max(100)
        .allow(null)
        .messages({
            'string.max': 'Sold to must not exceed 100 characters',
        }),
    organization_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Organization ID must be a number',
            'number.integer': 'Organization ID must be an integer',
            'number.min': 'Organization ID must be at least 1',
            'any.required': 'Organization ID is required',
        }),
});

const validateCreateItem = (data) => createItemSchema.validate(data, { abortEarly: false });
const validateUpdateItem = (data) => updateItemSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateItem, validateUpdateItem };