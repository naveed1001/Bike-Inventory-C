const asyncHandler = require("../../utils/asyncHandler");
const PaymentService = require('./paymentService');

exports.getAllPayments = asyncHandler(async (req, res) => {
    const response = await PaymentService.getAllPayments();
    res.status(response.code).json(response);
});

exports.getPaymentById = asyncHandler(async (req, res) => {
    const response = await PaymentService.getPaymentById(req.params.id);
    res.status(response.code).json(response);
});

exports.createPayment = asyncHandler(async (req, res) => {
    const response = await PaymentService.createPayment(req.body);
    res.status(response.code).json(response);
});

exports.updatePayment = asyncHandler(async (req, res) => {
    const response = await PaymentService.updatePayment(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deletePayment = asyncHandler(async (req, res) => {
    const response = await PaymentService.deletePayment(req.params.id);
    res.status(response.code).json(response);
});