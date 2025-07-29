const Joi = require('joi');

const createBrandSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Brand name is required',
            'string.min': 'Brand name must be at least 1 character long',
            'string.max': 'Brand name must not exceed 100 characters',
            'any.required': 'Brand name is required',
        }),
    website: Joi.string()
        .uri()
        .max(255)
        .allow(null, '')
        .optional()
        .messages({
            'string.uri': 'Website must be a valid URL',
            'string.max': 'Website must not exceed 255 characters',
        }),
});

const updateBrandSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Brand name is required',
            'string.min': 'Brand name must be at least 1 character long',
            'string.max': 'Brand name must not exceed 100 characters',
            'any.required': 'Brand name is required',
        }),
    website: Joi.string()
        .uri()
        .max(255)
        .allow(null, '')
        .optional()
        .messages({
            'string.uri': 'Website must be a valid URL',
            'string.max': 'Website must not exceed 255 characters',
        }),
});

const validateCreateBrand = (data) => createBrandSchema.validate(data, { abortEarly: false });
const validateUpdateBrand = (data) => updateBrandSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateBrand, validateUpdateBrand };