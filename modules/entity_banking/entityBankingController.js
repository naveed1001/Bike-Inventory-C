const asyncHandler = require("../../utils/asyncHandler");
const EntityBankingService = require('./entityBankingService');

exports.getAllEntityBankings = asyncHandler(async (req, res) => {
    const response = await EntityBankingService.getAllEntityBankings();
    res.status(response.code).json(response);
});

exports.getEntityBankingById = asyncHandler(async (req, res) => {
    const response = await EntityBankingService.getEntityBankingById(req.params.id);
    res.status(response.code).json(response);
});

exports.createEntityBanking = asyncHandler(async (req, res) => {
    const response = await EntityBankingService.createEntityBanking(req.body);
    res.status(response.code).json(response);
});

exports.updateEntityBanking = asyncHandler(async (req, res) => {
    const response = await EntityBankingService.updateEntityBanking(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteEntityBanking = asyncHandler(async (req, res) => {
    const response = await EntityBankingService.deleteEntityBanking(req.params.id);
    res.status(response.code).json(response);
});