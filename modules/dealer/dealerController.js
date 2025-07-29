const asyncHandler = require("../../utils/asyncHandler");
const DealerService = require('./dealerService');

exports.getAllDealers = asyncHandler(async (req, res) => {
    const response = await DealerService.getAllDealers();
    res.status(response.code).json(response);
});

exports.getDealerById = asyncHandler(async (req, res) => {
    const response = await DealerService.getDealerById(req.params.id);
    res.status(response.code).json(response);
});

exports.createDealer = asyncHandler(async (req, res) => {
    const response = await DealerService.createDealer(req.body);
    res.status(response.code).json(response);
});

exports.updateDealer = asyncHandler(async (req, res) => {
    const response = await DealerService.updateDealer(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteDealer = asyncHandler(async (req, res) => {
    const response = await DealerService.deleteDealer(req.params.id);
    res.status(response.code).json(response);
});