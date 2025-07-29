const asyncHandler = require("../../utils/asyncHandler");
const CitiesService = require('./citiesService');

exports.getAllCities = asyncHandler(async (req, res) => {
    const response = await CitiesService.getAllCities();
    res.status(response.code).json(response);
});

exports.getCityById = asyncHandler(async (req, res) => {
    const response = await CitiesService.getCityById(req.params.id);
    res.status(response.code).json(response);
});

exports.createCity = asyncHandler(async (req, res) => {
    const response = await CitiesService.createCity(req.body);
    res.status(response.code).json(response);
});

exports.updateCity = asyncHandler(async (req, res) => {
    const response = await CitiesService.updateCity(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteCity = asyncHandler(async (req, res) => {
    const response = await CitiesService.deleteCity(req.params.id);
    res.status(response.code).json(response);
});