const asyncHandler = require("../../utils/asyncHandler");
const ShipmentService = require('./shipmentService');

exports.getAllShipments = asyncHandler(async (req, res) => {
    const response = await ShipmentService.getAllShipments();
    res.status(response.code).json(response);
});

exports.getShipmentById = asyncHandler(async (req, res) => {
    const response = await ShipmentService.getShipmentById(req.params.id);
    res.status(response.code).json(response);
});

exports.createShipment = asyncHandler(async (req, res) => {
    const response = await ShipmentService.createShipment(req.body);
    res.status(response.code).json(response);
});

exports.updateShipment = asyncHandler(async (req, res) => {
    const response = await ShipmentService.updateShipment(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteShipment = asyncHandler(async (req, res) => {
    const response = await ShipmentService.deleteShipment(req.params.id);
    res.status(response.code).json(response);
});