const asyncHandler = require("../../utils/asyncHandler");
const PaymentDetailService = require('./paymentDetailService');

exports.getAllPaymentDetails = asyncHandler(async (req, res) => {
    const response = await PaymentDetailService.getAllPaymentDetails();
    res.status(response.code).json(response);
});

exports.getPaymentDetailById = asyncHandler(async (req, res) => {
    const response = await PaymentDetailService.getPaymentDetailById(req.params.id);
    res.status(response.code).json(response);
});

exports.createPaymentDetail = asyncHandler(async (req, res) => {
    const response = await PaymentDetailService.createPaymentDetail(req.body);
    res.status(response.code).json(response);
});

exports.updatePaymentDetail = asyncHandler(async (req, res) => {
    const response = await PaymentDetailService.updatePaymentDetail(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deletePaymentDetail = asyncHandler(async (req, res) => {
    const response = await PaymentDetailService.deletePaymentDetail(req.params.id);
    res.status(response.code).json(response);
});