const asyncHandler = require("../../utils/asyncHandler");
const CustomerService = require('./customerService');

exports.getAllCustomers = asyncHandler(async (req, res) => {
    const response = await CustomerService.getAllCustomers();
    res.status(response.code).json(response);
});

exports.getCustomerById = asyncHandler(async (req, res) => {
    const response = await CustomerService.getCustomerById(req.params.id);
    res.status(response.code).json(response);
});

exports.createCustomer = asyncHandler(async (req, res) => {
    const response = await CustomerService.createCustomer(req.body);
    res.status(response.code).json(response);
});

exports.updateCustomer = asyncHandler(async (req, res) => {
    const response = await CustomerService.updateCustomer(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteCustomer = asyncHandler(async (req, res) => {
    const response = await CustomerService.deleteCustomer(req.params.id);
    res.status(response.code).json(response);
});