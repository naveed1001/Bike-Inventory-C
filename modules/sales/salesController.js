const asyncHandler = require("../../utils/asyncHandler");
const SalesService = require('./salesService');

exports.getAllSales = asyncHandler(async (req, res) => {
    const response = await SalesService.getAllSales();
    res.status(response.code).json(response);
});

exports.getSaleById = asyncHandler(async (req, res) => {
    const response = await SalesService.getSaleById(req.params.id);
    res.status(response.code).json(response);
});

exports.createSale = asyncHandler(async (req, res) => {
    const response = await SalesService.createSale(req.body);
    res.status(response.code).json(response);
});

exports.updateSale = asyncHandler(async (req, res) => {
    const response = await SalesService.updateSale(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteSale = asyncHandler(async (req, res) => {
    const response = await SalesService.deleteSale(req.params.id);
    res.status(response.code).json(response);
});