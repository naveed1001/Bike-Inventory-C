const Joi = require('joi');

const createInstrumentSchema = Joi.object({
    number: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Number is required',
            'string.min': 'Number must be at least 1 character long',
            'string.max': 'Number must not exceed 50 characters',
            'any.required': 'Number is required',
        }),
    amount: Joi.number()
        .precision(2)
        .min(0)
        .allow(null)
        .messages({
            'number.base': 'Amount must be a number',
            'number.precision': 'Amount must have up to 2 decimal places',
            'number.min': 'Amount cannot be negative',
        }),
    date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Date must be a valid date',
        }),
    picture: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Picture path must not exceed 255 characters',
        }),
});

const updateInstrumentSchema = Joi.object({
    number: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Number is required',
            'string.min': 'Number must be at least 1 character long',
            'string.max': 'Number must not exceed 50 characters',
            'any.required': 'Number is required',
        }),
    amount: Joi.number()
        .precision(2)
        .min(0)
        .allow(null)
        .messages({
            'number.base': 'Amount must be a number',
            'number.precision': 'Amount must have up to 2 decimal places',
            'number.min': 'Amount cannot be negative',
        }),
    date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Date must be a valid date',
        }),
    picture: Joi.string()
        .trim()
        .max(255)
        .allow(null)
        .messages({
            'string.max': 'Picture path must not exceed 255 characters',
        }),
});

const validateCreateInstrument = (data) => createInstrumentSchema.validate(data, { abortEarly: false });
const validateUpdateInstrument = (data) => updateInstrumentSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateInstrument, validateUpdateInstrument };