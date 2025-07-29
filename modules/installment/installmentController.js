const asyncHandler = require("../../utils/asyncHandler");
const InstallmentService = require('./installmentService');

exports.getAllInstallments = asyncHandler(async (req, res) => {
    const response = await InstallmentService.getAllInstallments();
    res.status(response.code).json(response);
});

exports.getInstallmentById = asyncHandler(async (req, res) => {
    const response = await InstallmentService.getInstallmentById(req.params.id);
    res.status(response.code).json(response);
});

exports.createInstallment = asyncHandler(async (req, res) => {
    const response = await InstallmentService.createInstallment(req.body);
    res.status(response.code).json(response);
});

exports.updateInstallment = asyncHandler(async (req, res) => {
    const response = await InstallmentService.updateInstallment(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteInstallment = asyncHandler(async (req, res) => {
    const response = await InstallmentService.deleteInstallment(req.params.id);
    res.status(response.code).json(response);
});