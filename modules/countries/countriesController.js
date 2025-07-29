const asyncHandler = require("../../utils/asyncHandler");
const CountriesService = require('./countriesService');

exports.getAllCountries = asyncHandler(async (req, res) => {
    const response = await CountriesService.getAllCountries();
    res.status(response.code).json(response);
});

exports.getCountryById = asyncHandler(async (req, res) => {
    const response = await CountriesService.getCountryById(req.params.id);
    res.status(response.code).json(response);
});

exports.createCountry = asyncHandler(async (req, res) => {
    const response = await CountriesService.createCountry(req.body);
    res.status(response.code).json(response);
});

exports.updateCountry = asyncHandler(async (req, res) => {
    const response = await CountriesService.updateCountry(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteCountry = asyncHandler(async (req, res) => {
    const response = await CountriesService.deleteCountry(req.params.id);
    res.status(response.code).json(response);
});