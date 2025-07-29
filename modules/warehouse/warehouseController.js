const asyncHandler = require("../../utils/asyncHandler");
const WarehouseService = require('./warehouseService');

exports.getAllWarehouses = asyncHandler(async (req, res) => {
    const response = await WarehouseService.getAllWarehouses();
    res.status(response.code).json(response);
});

exports.getWarehouseById = asyncHandler(async (req, res) => {
    const response = await WarehouseService.getWarehouseById(req.params.id);
    res.status(response.code).json(response);
});

exports.createWarehouse = asyncHandler(async (req, res) => {
    const response = await WarehouseService.createWarehouse(req.body);
    res.status(response.code).json(response);
});

exports.updateWarehouse = asyncHandler(async (req, res) => {
    const response = await WarehouseService.updateWarehouse(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteWarehouse = asyncHandler(async (req, res) => {
    const response = await WarehouseService.deleteWarehouse(req.params.id);
    res.status(response.code).json(response);
});