const Joi = require('joi');

exports.validateCreateRole = (data) => {
    const schema = Joi.object({
        role_name: Joi.string().required().messages({
            'string.empty': 'Role name is required',
        }),
    });
    return schema.validate(data, { abortEarly: false });
};

exports.validateUpdateRole = (data) => {
    const schema = Joi.object({
        role_name: Joi.string().required().messages({
            'string.empty': 'Role name is required',
        }),
    });
    return schema.validate(data, { abortEarly: false });
};