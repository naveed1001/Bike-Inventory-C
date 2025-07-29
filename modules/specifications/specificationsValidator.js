const Joi = require('joi');

const createSpecificationSchema = Joi.object({
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
    value: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Value must not exceed 255 characters',
        }),
    item_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .messages({
            'number.base': 'Item ID must be a number',
            'number.integer': 'Item ID must be an integer',
            'number.positive': 'Item ID must be a positive number',
        }),
});

const updateSpecificationSchema = Joi.object({
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
    value: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Value must not exceed 255 characters',
        }),
    item_id: Joi.number()
        .integer()
        .positive()
        .allow(null)
        .messages({
            'number.base': 'Item ID must be a number',
            'number.integer': 'Item ID must be an integer',
            'number.positive': 'Item ID must be a positive number',
        }),
});

const validateCreateSpecification = (data) => createSpecificationSchema.validate(data, { abortEarly: false });
const validateUpdateSpecification = (data) => updateSpecificationSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateSpecification, validateUpdateSpecification };