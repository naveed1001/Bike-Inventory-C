const Joi = require('joi');

const createCitySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'City name is required',
            'string.min': 'City name must be at least 1 character long',
            'string.max': 'City name must not exceed 100 characters',
            'any.required': 'City name is required',
        }),
});

const updateCitySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'City name is required',
            'string.min': 'City name must be at least 1 character long',
            'string.max': 'City name must not exceed 100 characters',
            'any.required': 'City name is required',
        }),
});

const validateCreateCity = (data) => createCitySchema.validate(data, { abortEarly: false });
const validateUpdateCity = (data) => updateCitySchema.validate(data, { abortEarly: false });

module.exports = { validateCreateCity, validateUpdateCity };