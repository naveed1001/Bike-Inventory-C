const asyncHandler = require("../../utils/asyncHandler");
const ItemService = require('./itemService');

exports.getAllItems = asyncHandler(async (req, res) => {
    const response = await ItemService.getAllItems();
    res.status(response.code).json(response);
});

exports.getItemById = asyncHandler(async (req, res) => {
    const response = await ItemService.getItemById(req.params.id);
    res.status(response.code).json(response);
});

exports.createItem = asyncHandler(async (req, res) => {
    const response = await ItemService.createItem(req.body);
    res.status(response.code).json(response);
});

exports.updateItem = asyncHandler(async (req, res) => {
    const response = await ItemService.updateItem(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteItem = asyncHandler(async (req, res) => {
    const response = await ItemService.deleteItem(req.params.id);
    res.status(response.code).json(response);
});