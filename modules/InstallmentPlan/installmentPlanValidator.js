const Joi = require('joi');

const createInstallmentPlanSchema = Joi.object({
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
    advance_amount: Joi.number()
        .precision(2)
        .min(0)
        .default(0.00)
        .messages({
            'number.base': 'Advance amount must be a number',
            'number.precision': 'Advance amount must have up to 2 decimal places',
            'number.min': 'Advance amount cannot be negative',
        }),
    tenure: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.min': 'Tenure must be at least 1',
            'any.required': 'Tenure is required',
        }),
    installment_amount: Joi.number()
        .precision(2)
        .min(0)
        .required()
        .messages({
            'number.base': 'Installment amount must be a number',
            'number.precision': 'Installment amount must have up to 2 decimal places',
            'number.min': 'Installment amount cannot be negative',
            'any.required': 'Installment amount is required',
        }),
});

const updateInstallmentPlanSchema = Joi.object({
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
    advance_amount: Joi.number()
        .precision(2)
        .min(0)
        .default(0.00)
        .messages({
            'number.base': 'Advance amount must be a number',
            'number.precision': 'Advance amount must have up to 2 decimal places',
            'number.min': 'Advance amount cannot be negative',
        }),
    tenure: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.min': 'Tenure must be at least 1',
            'any.required': 'Tenure is required',
        }),
    installment_amount: Joi.number()
        .precision(2)
        .min(0)
        .required()
        .messages({
            'number.base': 'Installment amount must be a number',
            'number.precision': 'Installment amount must have up to 2 decimal places',
            'number.min': 'Installment amount cannot be negative',
            'any.required': 'Installment amount is required',
        }),
});

const validateCreateInstallmentPlan = (data) => createInstallmentPlanSchema.validate(data, { abortEarly: false });
const validateUpdateInstallmentPlan = (data) => updateInstallmentPlanSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateInstallmentPlan, validateUpdateInstallmentPlan };