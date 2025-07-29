const asyncHandler = require("../../utils/asyncHandler");
const CapacityTypesService = require('./capacityTypesService');

exports.getAllCapacityTypes = asyncHandler(async (req, res) => {
    const response = await CapacityTypesService.getAllCapacityTypes();
    res.status(response.code).json(response);
});

exports.getCapacityTypeById = asyncHandler(async (req, res) => {
    const response = await CapacityTypesService.getCapacityTypeById(req.params.id);
    res.status(response.code).json(response);
});

exports.createCapacityType = asyncHandler(async (req, res) => {
    const response = await CapacityTypesService.createCapacityType(req.body);
    res.status(response.code).json(response);
});

exports.updateCapacityType = asyncHandler(async (req, res) => {
    const response = await CapacityTypesService.updateCapacityType(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteCapacityType = asyncHandler(async (req, res) => {
    const response = await CapacityTypesService.deleteCapacityType(req.params.id);
    res.status(response.code).json(response);
});