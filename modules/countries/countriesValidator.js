const Joi = require('joi');

const createCountrySchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.empty': 'Country name is required',
    }),
});

const updateCountrySchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.empty': 'Country name is required',
    }),
});

const validateCreateCountry = (data) => createCountrySchema.validate(data, { abortEarly: false });
const validateUpdateCountry = (data) => updateCountrySchema.validate(data, { abortEarly: false });

module.exports = { validateCreateCountry, validateUpdateCountry };