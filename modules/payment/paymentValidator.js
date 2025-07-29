const Joi = require('joi');

const createPaymentSchema = Joi.object({
    nature: Joi.string()
        .trim()
        .min(1)
        .max(250)
        .required()
        .messages({
            'string.empty': 'Nature is required',
            'string.min': 'Nature must be at least 1 character long',
            'string.max': 'Nature must not exceed 250 characters',
            'any.required': 'Nature is required',
        }),
    type: Joi.string()
        .trim()
        .min(1)
        .max(250)
        .required()
        .messages({
            'string.empty': 'Type is required',
            'string.min': 'Type must be at least 1 character long',
            'string.max': 'Type must not exceed 250 characters',
            'any.required': 'Type is required',
        }),
    amount: Joi.number()
        .precision(2)
        .min(0)
        .required()
        .messages({
            'number.base': 'Amount must be a number',
            'number.precision': 'Amount must have up to 2 decimal places',
            'number.min': 'Amount cannot be negative',
            'any.required': 'Amount is required',
        }),
    payee: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Payee is required',
            'string.min': 'Payee must be at least 1 character long',
            'string.max': 'Payee must not exceed 100 characters',
            'any.required': 'Payee is required',
        }),
    beneficiary: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Beneficiary is required',
            'string.min': 'Beneficiary must be at least 1 character long',
            'string.max': 'Beneficiary must not exceed 100 characters',
            'any.required': 'Beneficiary is required',
        }),
});

const updatePaymentSchema = Joi.object({
    nature: Joi.string()
        .trim()
        .min(1)
        .max(250)
        .required()
        .messages({
            'string.empty': 'Nature is required',
            'string.min': 'Nature must be at least 1 character long',
            'string.max': 'Nature must not exceed 250 characters',
            'any.required': 'Nature is required',
        }),
    type: Joi.string()
        .trim()
        .min(1)
        .max(250)
        .required()
        .messages({
            'string.empty': 'Type is required',
            'string.min': 'Type must be at least 1 character long',
            'string.max': 'Type must not exceed 250 characters',
            'any.required': 'Type is required',
        }),
    amount: Joi.number()
        .precision(2)
        .min(0)
        .required()
        .messages({
            'number.base': 'Amount must be a number',
            'number.precision': 'Amount must have up to 2 decimal places',
            'number.min': 'Amount cannot be negative',
            'any.required': 'Amount is required',
        }),
    payee: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Payee is required',
            'string.min': 'Payee must be at least 1 character long',
            'string.max': 'Payee must not exceed 100 characters',
            'any.required': 'Payee is required',
        }),
    beneficiary: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Beneficiary is required',
            'string.min': 'Beneficiary must be at least 1 character long',
            'string.max': 'Beneficiary must not exceed 100 characters',
            'any.required': 'Beneficiary is required',
        }),
});

const validateCreatePayment = (data) => createPaymentSchema.validate(data, { abortEarly: false });
const validateUpdatePayment = (data) => updatePaymentSchema.validate(data, { abortEarly: false });

module.exports = { validateCreatePayment, validateUpdatePayment };