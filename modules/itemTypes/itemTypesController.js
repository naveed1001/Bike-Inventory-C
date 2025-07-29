const asyncHandler = require("../../utils/asyncHandler");
const ItemTypesService = require('./itemTypesService');

exports.getAllItemTypes = asyncHandler(async (req, res) => {
    const response = await ItemTypesService.getAllItemTypes();
    res.status(response.code).json(response);
});

exports.getItemTypeById = asyncHandler(async (req, res) => {
    const response = await ItemTypesService.getItemTypeById(req.params.id);
    res.status(response.code).json(response);
});

exports.createItemType = asyncHandler(async (req, res) => {
    const response = await ItemTypesService.createItemType(req.body);
    res.status(response.code).json(response);
});

exports.updateItemType = asyncHandler(async (req, res) => {
    const response = await ItemTypesService.updateItemType(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteItemType = asyncHandler(async (req, res) => {
    const response = await ItemTypesService.deleteItemType(req.params.id);
    res.status(response.code).json(response);
});