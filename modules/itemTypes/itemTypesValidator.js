const Joi = require('joi');

const createItemTypeSchema = Joi.object({
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
    description: Joi.string()
        .trim()
        .allow(null)
        .optional()
        .messages({
            'string.base': 'Description must be a string',
        }),
});

const updateItemTypeSchema = Joi.object({
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
    description: Joi.string()
        .trim()
        .allow(null)
        .optional()
        .messages({
            'string.base': 'Description must be a string',
        }),
});

const validateCreateItemType = (data) => createItemTypeSchema.validate(data, { abortEarly: false });
const validateUpdateItemType = (data) => updateItemTypeSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateItemType, validateUpdateItemType };