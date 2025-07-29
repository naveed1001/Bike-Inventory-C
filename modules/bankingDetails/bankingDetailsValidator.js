const Joi = require('joi');

exports.validateCreateBankingDetail = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(100).required().messages({
            'string.empty': 'Name is required',
            'string.max': 'Name must not exceed 100 characters'
        }),
        account_number: Joi.string().max(100).required().messages({
            'string.empty': 'Account number is required',
            'string.max': 'Account number must not exceed 100 characters'
        }),
        branch: Joi.string().max(100).allow(null).messages({
            'string.max': 'Branch must not exceed 100 characters'
        }),
        iban: Joi.string().max(50).allow(null).messages({
            'string.max': 'IBAN must not exceed 50 characters'
        })
    });
    return schema.validate(data, { abortEarly: false });
};

exports.validateUpdateBankingDetail = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(100).required().messages({
            'string.empty': 'Name is required',
            'string.max': 'Name must not exceed 100 characters'
        }),
        account_number: Joi.string().max(100).required().messages({
            'string.empty': 'Account number is required',
            'string.max': 'Account number must not exceed 100 characters'
        }),
        branch: Joi.string().max(100).allow(null).messages({
            'string.max': 'Branch must not exceed 100 characters'
        }),
        iban: Joi.string().max(50).allow(null).messages({
            'string.max': 'IBAN must not exceed 50 characters'
        })
    });
    return schema.validate(data, { abortEarly: false });
};