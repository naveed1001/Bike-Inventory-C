const Joi = require('joi');

const createItemTransferSchema = Joi.object({
    item_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Item ID must be a number',
            'number.integer': 'Item ID must be an integer',
            'number.min': 'Item ID must be at least 1',
            'any.required': 'Item ID is required',
        }),
    from_warehouse_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'From warehouse ID must be a number',
            'number.integer': 'From warehouse ID must be an integer',
            'number.min': 'From warehouse ID must be at least 1',
            'any.required': 'From warehouse ID is required',
        }),
    to_warehouse_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'To warehouse ID must be a number',
            'number.integer': 'To warehouse ID must be an integer',
            'number.min': 'To warehouse ID must be at least 1',
            'any.required': 'To warehouse ID is required',
        }),
    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Quantity must be a number',
            'number.integer': 'Quantity must be an integer',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required',
        }),
    transferred_by: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Transferred by ID must be a number',
            'number.integer': 'Transferred by ID must be an integer',
            'number.min': 'Transferred by ID must be at least 1',
        }),
    remarks: Joi.string()
        .allow(null)
        .messages({
            'string.base': 'Remarks must be a string',
        }),
});

const updateItemTransferSchema = Joi.object({
    item_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Item ID must be a number',
            'number.integer': 'Item ID must be an integer',
            'number.min': 'Item ID must be at least 1',
            'any.required': 'Item ID is required',
        }),
    from_warehouse_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'From warehouse ID must be a number',
            'number.integer': 'From warehouse ID must be an integer',
            'number.min': 'From warehouse ID must be at least 1',
            'any.required': 'From warehouse ID is required',
        }),
    to_warehouse_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'To warehouse ID must be a number',
            'number.integer': 'To warehouse ID must be an integer',
            'number.min': 'To warehouse ID must be at least 1',
            'any.required': 'To warehouse ID is required',
        }),
    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Quantity must be a number',
            'number.integer': 'Quantity must be an integer',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required',
        }),
    transferred_by: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Transferred by ID must be a number',
            'number.integer': 'Transferred by ID must be an integer',
            'number.min': 'Transferred by ID must be at least 1',
        }),
    remarks: Joi.string()
        .allow(null)
        .messages({
            'string.base': 'Remarks must be a string',
        }),
});

const validateCreateItemTransfer = (data) => createItemTransferSchema.validate(data, { abortEarly: false });
const validateUpdateItemTransfer = (data) => updateItemTransferSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateItemTransfer, validateUpdateItemTransfer };