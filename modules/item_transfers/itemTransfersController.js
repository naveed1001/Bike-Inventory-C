const asyncHandler = require("../../utils/asyncHandler");
const ItemTransfersService = require('./itemTransfersService');

exports.getAllItemTransfers = asyncHandler(async (req, res) => {
    const response = await ItemTransfersService.getAllItemTransfers();
    res.status(response.code).json(response);
});

exports.getItemTransferById = asyncHandler(async (req, res) => {
    const response = await ItemTransfersService.getItemTransferById(req.params.id);
    res.status(response.code).json(response);
});

exports.createItemTransfer = asyncHandler(async (req, res) => {
    const response = await ItemTransfersService.createItemTransfer(req.body);
    res.status(response.code).json(response);
});

exports.updateItemTransfer = asyncHandler(async (req, res) => {
    const response = await ItemTransfersService.updateItemTransfer(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteItemTransfer = asyncHandler(async (req, res) => {
    const response = await ItemTransfersService.deleteItemTransfer(req.params.id);
    res.status(response.code).json(response);
});