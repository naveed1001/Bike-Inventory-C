const Joi = require('joi');

const createEntityBankingSchema = Joi.object({
    entity_type: Joi.string()
        .trim()
        .max(500)
        .required()
        .messages({
            'string.empty': 'Entity type is required',
            'string.max': 'Entity type must not exceed 500 characters',
            'any.required': 'Entity type is required',
        }),
    entity_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Entity ID must be a number',
            'number.integer': 'Entity ID must be an integer',
            'number.min': 'Entity ID must be at least 1',
            'any.required': 'Entity ID is required',
        }),
    banking_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.min': 'Banking ID must be at least 1',
        }),
});

const updateEntityBankingSchema = Joi.object({
    entity_type: Joi.string()
        .trim()
        .max(500)
        .required()
        .messages({
            'string.empty': 'Entity type is required',
            'string.max': 'Entity type must not exceed 500 characters',
            'any.required': 'Entity type is required',
        }),
    entity_id: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Entity ID must be a number',
            'number.integer': 'Entity ID must be an integer',
            'number.min': 'Entity ID must be at least 1',
            'any.required': 'Entity ID is required',
        }),
    banking_id: Joi.number()
        .integer()
        .min(1)
        .allow(null)
        .messages({
            'number.base': 'Banking ID must be a number',
            'number.integer': 'Banking ID must be an integer',
            'number.min': 'Banking ID must be at least 1',
        }),
});

const validateCreateEntityBanking = (data) => createEntityBankingSchema.validate(data, { abortEarly: false });
const validateUpdateEntityBanking = (data) => updateEntityBankingSchema.validate(data, { abortEarly: false });

module.exports = { validateCreateEntityBanking, validateUpdateEntityBanking };