const asyncHandler = require("../../utils/asyncHandler");
const DealershipService = require('./dealershipService');

exports.getAllDealerships = asyncHandler(async (req, res) => {
    const response = await DealershipService.getAllDealerships();
    res.status(response.code).json(response);
});

exports.getDealershipById = asyncHandler(async (req, res) => {
    const response = await DealershipService.getDealershipById(req.params.id);
    res.status(response.code).json(response);
});

exports.createDealership = asyncHandler(async (req, res) => {
    const response = await DealershipService.createDealership(req.body);
    res.status(response.code).json(response);
});

exports.updateDealership = asyncHandler(async (req, res) => {
    const response = await DealershipService.updateDealership(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteDealership = asyncHandler(async (req, res) => {
    const response = await DealershipService.deleteDealership(req.params.id);
    res.status(response.code).json(response);
});