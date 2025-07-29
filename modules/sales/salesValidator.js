const Joi = require('joi');

const createSaleSchema = Joi.object({
    item_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Item ID must be a number',
            'number.integer': 'Item ID must be an integer',
            'number.min': 'Item ID must be at least 1',
        }),
    customer_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Customer ID must be a number',
            'number.integer': 'Customer ID must be an integer',
            'number.min': 'Customer ID must be at least 1',
        }),
    dealer_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Dealer ID must be a number',
            'number.integer': 'Dealer ID must be an integer',
            'number.min': 'Dealer ID must be at least 1',
        }),
    payment_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Payment ID must be a number',
            'number.integer': 'Payment ID must be an integer',
            'number.min': 'Payment ID must be at least 1',
        }),
});

const updateSaleSchema = Joi.object({
    item_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Item ID must be a number',
            'number.integer': 'Item ID must be an integer',
            'number.min': 'Item ID must be at least 1',
        }),
    customer_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Customer ID must be a number',
            'number.integer': 'Customer ID must be an integer',
            'number.min': 'Customer ID must be at least 1',
        }),
    dealer_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Dealer ID must be a number',
            'number.integer': 'Dealer ID must be an integer',
            'number.min': 'Dealer ID must be at least 1',
        }),
    payment_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Payment ID must be a number',
            'number.integer': 'Payment ID must be an integer',
            'number.min': 'Payment ID must be at least 1',
        }),
});

const validateCreateSale = (data) => createSaleSchema.validate(data, { abortEarly: false });
const validateUpdateSale = (data) => updateSaleSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateSale, validateUpdateSale };