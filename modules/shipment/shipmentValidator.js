const Joi = require('joi');

const createShipmentSchema = Joi.object({
    shipping_agent_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Shipping agent ID must be a number',
            'number.integer': 'Shipping agent ID must be an integer',
            'number.min': 'Shipping agent ID must be at least 1',
        }),
    item_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Item ID must be a number',
            'number.integer': 'Item ID must be an integer',
            'number.min': 'Item ID must be at least 1',
        }),
    warehouse_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Warehouse ID must be a number',
            'number.integer': 'Warehouse ID must be an integer',
            'number.min': 'Warehouse ID must be at least 1',
        }),
    destination: Joi.string()
        .trim()
        .max(1000)
        .allow(null)
        .messages({
            'string.max': 'Destination must not exceed 1000 characters',
        }),
    status_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Status ID must be a number',
            'number.integer': 'Status ID must be an integer',
            'number.min': 'Status ID must be at least 1',
        }),
    rider_name: Joi.string()
        .trim()
        .max(200)
        .allow(null)
        .messages({
            'string.max': 'Rider name must not exceed 200 characters',
        }),
    rider_number: Joi.string()
        .trim()
        .max(20)
        .allow(null)
        .messages({
            'string.max': 'Rider number must not exceed 20 characters',
        }),
});

const updateShipmentSchema = Joi.object({
    shipping_agent_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Shipping agent ID must be a number',
            'number.integer': 'Shipping agent ID must be an integer',
            'number.min': 'Shipping agent ID must be at least 1',
        }),
    item_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Item ID must be a number',
            'number.integer': 'Item ID must be an integer',
            'number.min': 'Item ID must be at least 1',
        }),
    warehouse_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Warehouse ID must be a number',
            'number.integer': 'Warehouse ID must be an integer',
            'number.min': 'Warehouse ID must be at least 1',
        }),
    destination: Joi.string()
        .trim()
        .max(1000)
        .allow(null)
        .messages({
            'string.max': 'Destination must not exceed 1000 characters',
        }),
    status_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Status ID must be a number',
            'number.integer': 'Status ID must be an integer',
            'number.min': 'Status ID must be at least 1',
        }),
    rider_name: Joi.string()
        .trim()
        .max(200)
        .allow(null)
        .messages({
            'string.max': 'Rider name must not exceed 200 characters',
        }),
    rider_number: Joi.string()
        .trim()
        .max(20)
        .allow(null)
        .messages({
            'string.max': 'Rider number must not exceed 20 characters',
        }),
});

const validateCreateShipment = (data) => createShipmentSchema.validate(data, { abortEarly: false });
const validateUpdateShipment = (data) => updateShipmentSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateShipment, validateUpdateShipment };