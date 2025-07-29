const asyncHandler = require("../../utils/asyncHandler");
const BankingDetailsService = require('./bankingDetailsService');

exports.getAllBankingDetails = asyncHandler(async (req, res) => {
    const response = await BankingDetailsService.getAllBankingDetails();
    res.status(response.code).json(response);
});

exports.getBankingDetailById = asyncHandler(async (req, res) => {
    const response = await BankingDetailsService.getBankingDetailById(req.params.id);
    res.status(response.code).json(response);
});

exports.createBankingDetail = asyncHandler(async (req, res) => {
    const response = await BankingDetailsService.createBankingDetail(req.body);
    res.status(response.code).json(response);
});

exports.updateBankingDetail = asyncHandler(async (req, res) => {
    const response = await BankingDetailsService.updateBankingDetail(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteBankingDetail = asyncHandler(async (req, res) => {
    const response = await BankingDetailsService.deleteBankingDetail(req.params.id);
    res.status(response.code).json(response);
});