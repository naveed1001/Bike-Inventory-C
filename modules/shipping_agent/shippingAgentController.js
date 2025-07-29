const asyncHandler = require("../../utils/asyncHandler");
const ShippingAgentService = require('./shippingAgentService');

exports.getAllShippingAgents = asyncHandler(async (req, res) => {
    const response = await ShippingAgentService.getAllShippingAgents();
    res.status(response.code).json(response);
});

exports.getShippingAgentById = asyncHandler(async (req, res) => {
    const response = await ShippingAgentService.getShippingAgentById(req.params.id);
    res.status(response.code).json(response);
});

exports.createShippingAgent = asyncHandler(async (req, res) => {
    const response = await ShippingAgentService.createShippingAgent(req.body);
    res.status(response.code).json(response);
});

exports.updateShippingAgent = asyncHandler(async (req, res) => {
    const response = await ShippingAgentService.updateShippingAgent(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteShippingAgent = asyncHandler(async (req, res) => {
    const response = await ShippingAgentService.deleteShippingAgent(req.params.id);
    res.status(response.code).json(response);
});