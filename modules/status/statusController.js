const asyncHandler = require("../../utils/asyncHandler");
const StatusService = require('./statusService');

exports.getAllStatuses = asyncHandler(async (req, res) => {
    const response = await StatusService.getAllStatuses();
    res.status(response.code).json(response);
});

exports.getStatusById = asyncHandler(async (req, res) => {
    const response = await StatusService.getStatusById(req.params.id);
    res.status(response.code).json(response);
});

exports.createStatus = asyncHandler(async (req, res) => {
    const response = await StatusService.createStatus(req.body);
    res.status(response.code).json(response);
});

exports.updateStatus = asyncHandler(async (req, res) => {
    const response = await StatusService.updateStatus(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteStatus = asyncHandler(async (req, res) => {
    const response = await StatusService.deleteStatus(req.params.id);
    res.status(response.code).json(response);
});