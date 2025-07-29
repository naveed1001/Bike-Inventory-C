const asyncHandler = require("../../utils/asyncHandler");
const VendorService = require('./vendorService');

exports.getAllVendors = asyncHandler(async (req, res) => {
    const response = await VendorService.getAllVendors();
    res.status(response.code).json(response);
});

exports.getVendorById = asyncHandler(async (req, res) => {
    const response = await VendorService.getVendorById(req.params.id);
    res.status(response.code).json(response);
});

exports.createVendor = asyncHandler(async (req, res) => {
    const response = await VendorService.createVendor(req.body);
    res.status(response.code).json(response);
});

exports.updateVendor = asyncHandler(async (req, res) => {
    const response = await VendorService.updateVendor(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteVendor = asyncHandler(async (req, res) => {
    const response = await VendorService.deleteVendor(req.params.id);
    res.status(response.code).json(response);
});