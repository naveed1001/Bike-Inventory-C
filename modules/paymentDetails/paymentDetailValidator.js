const Joi = require('joi');

const createPaymentDetailSchema = Joi.object({
    payment_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Payment ID must be a number',
            'number.integer': 'Payment ID must be an integer',
            'number.min': 'Payment ID must be at least 1',
        }),
    installment_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Installment ID must be a number',
            'number.integer': 'Installment ID must be an integer',
            'number.min': 'Installment ID must be at least 1',
        }),
    type: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Type is required',
            'string.min': 'Type must be at least 1 character long',
            'string.max': 'Type must not exceed 100 characters',
            'any.required': 'Type is required',
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
    due_amount: Joi.number()
        .precision(2)
        .min(0)
        .default(0.00)
        .messages({
            'number.base': 'Due amount must be a number',
            'number.precision': 'Due amount must have up to 2 decimal places',
            'number.min': 'Due amount cannot be negative',
        }),
    due_date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Due date must be a valid date',
        }),
    paid_date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Paid date must be a valid date',
        }),
    remarks: Joi.string()
        .trim()
        .allow(null)
        .messages({
            'string.base': 'Remarks must be a string',
        }),
});

const updatePaymentDetailSchema = Joi.object({
    payment_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Payment ID must be a number',
            'number.integer': 'Payment ID must be an integer',
            'number.min': 'Payment ID must be at least 1',
        }),
    installment_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Installment ID must be a number',
            'number.integer': 'Installment ID must be an integer',
            'number.min': 'Installment ID must be at least 1',
        }),
    type: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Type is required',
            'string.min': 'Type must be at least 1 character long',
            'string.max': 'Type must not exceed 100 characters',
            'any.required': 'Type is required',
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
    due_amount: Joi.number()
        .precision(2)
        .min(0)
        .default(0.00)
        .messages({
            'number.base': 'Due amount must be a number',
            'number.precision': 'Due amount must have up to 2 decimal places',
            'number.min': 'Due amount cannot be negative',
        }),
    due_date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Due date must be a valid date',
        }),
    paid_date: Joi.date()
        .allow(null)
        .messages({
            'date.base': 'Paid date must be a valid date',
        }),
    remarks: Joi.string()
        .trim()
        .allow(null)
        .messages({
            'string.base': 'Remarks must be a string',
        }),
});

const validateCreatePaymentDetail = (data) => createPaymentDetailSchema.validate(data, { abortEarly: false });
const validateUpdatePaymentDetail = (data) => updatePaymentDetailSchema.validate(data, { abortEarly: false });

module.exports = { validateCreatePaymentDetail, validateUpdatePaymentDetail };