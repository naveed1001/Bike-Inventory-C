const Joi = require('joi');

const createCapacityTypeSchema = Joi.object({
    item_type_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Item type ID must be a number',
            'number.integer': 'Item type ID must be an integer',
            'number.positive': 'Item type ID must be a positive number',
            'any.required': 'Item type ID is required',
        }),
    item_capacity: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Item capacity is required',
            'string.min': 'Item capacity must be at least 1 character long',
            'string.max': 'Item capacity must not exceed 100 characters',
            'any.required': 'Item capacity is required',
        }),
    warehouse_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Warehouse ID must be a number',
            'number.integer': 'Warehouse ID must be an integer',
            'number.positive': 'Warehouse ID must be a positive number',
            'any.required': 'Warehouse ID is required',
        }),
});

const updateCapacityTypeSchema = Joi.object({
    item_type_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Item type ID must be a number',
            'number.integer': 'Item type ID must be an integer',
            'number.positive': 'Item type ID must be a positive number',
            'any.required': 'Item type ID is required',
        }),
    item_capacity: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Item capacity is required',
            'string.min': 'Item capacity must be at least 1 character long',
            'string.max': 'Item capacity must not exceed 100 characters',
            'any.required': 'Item capacity is required',
        }),
    warehouse_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Warehouse ID must be a number',
            'number.integer': 'Warehouse ID must be an integer',
            'number.positive': 'Warehouse ID must be a positive number',
            'any.required': 'Warehouse ID is required',
        }),
});

const validateCreateCapacityType = (data) => createCapacityTypeSchema.validate(data, { abortEarly: false });
const validateUpdateCapacityType = (data) => updateCapacityTypeSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateCapacityType, validateUpdateCapacityType };