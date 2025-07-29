const Joi = require('joi');

const createInstallmentSchema = Joi.object({
    installment_plan_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Installment plan ID must be a number',
            'number.integer': 'Installment plan ID must be an integer',
            'number.min': 'Installment plan ID must be at least 1',
        }),
    instrument_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Instrument ID must be a number',
            'number.integer': 'Instrument ID must be an integer',
            'number.min': 'Instrument ID must be at least 1',
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
    remarks: Joi.string()
        .trim()
        .allow(null)
        .messages({
            'string.base': 'Remarks must be a string',
        }),
});

const updateInstallmentSchema = Joi.object({
    installment_plan_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Installment plan ID must be a number',
            'number.integer': 'Installment plan ID must be an integer',
            'number.min': 'Installment plan ID must be at least 1',
        }),
    instrument_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Instrument ID must be a number',
            'number.integer': 'Instrument ID must be an integer',
            'number.min': 'Instrument ID must be at least 1',
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
    remarks: Joi.string()
        .trim()
        .allow(null)
        .messages({
            'string.base': 'Remarks must be a string',
        }),
});

const validateCreateInstallment = (data) => createInstallmentSchema.validate(data, { abortEarly: false });
const validateUpdateInstallment = (data) => updateInstallmentSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateInstallment, validateUpdateInstallment };