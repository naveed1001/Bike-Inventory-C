const Joi = require('joi');

exports.validateCreatePermission = (data) => {
    const schema = Joi.object({
        permission_name: Joi.string().required().max(100).messages({
            'string.empty': 'Permission name is required',
            'string.max': 'Permission name must not exceed 100 characters'
        }),
        permission_key: Joi.string().required().max(50).messages({
            'string.empty': 'Permission key is required',
            'string.max': 'Permission key must not exceed 50 characters'
        }),
    });
    return schema.validate(data, { abortEarly: false });
};

exports.validateUpdatePermission = (data) => {
    const schema = Joi.object({
        permission_name: Joi.string().required().max(100).messages({
            'string.empty': 'Permission name is required',
            'string.max': 'Permission name must not exceed 100 characters'
        }),
        permission_key: Joi.string().required().max(50).messages({
            'string.empty': 'Permission key is required',
            'string.max': 'Permission key must not exceed 50 characters'
        }),
    });
    return schema.validate(data, { abortEarly: false });
};