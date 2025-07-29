const asyncHandler = require("../../utils/asyncHandler");
const SpecificationsService = require('./specificationsService');

exports.getAllSpecifications = asyncHandler(async (req, res) => {
    const response = await SpecificationsService.getAllSpecifications();
    res.status(response.code).json(response);
});

exports.getSpecificationById = asyncHandler(async (req, res) => {
    const response = await SpecificationsService.getSpecificationById(req.params.id);
    res.status(response.code).json(response);
});

exports.createSpecification = asyncHandler(async (req, res) => {
    const response = await SpecificationsService.createSpecification(req.body);
    res.status(response.code).json(response);
});

exports.updateSpecification = asyncHandler(async (req, res) => {
    const response = await SpecificationsService.updateSpecification(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteSpecification = asyncHandler(async (req, res) => {
    const response = await SpecificationsService.deleteSpecification(req.params.id);
    res.status(response.code).json(response);
});