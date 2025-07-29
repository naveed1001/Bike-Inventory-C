const asyncHandler = require("../../utils/asyncHandler");
const { uploadBrandLogo } = require('../../middlewares/multer');
const BrandService = require('./brandService');

exports.getAllBrands = asyncHandler(async (req, res) => {
    const response = await BrandService.getAllBrands();
    res.status(response.code).json(response);
});

exports.getBrandById = asyncHandler(async (req, res) => {
    const response = await BrandService.getBrandById(req.params.id);
    res.status(response.code).json(response);
});

exports.createBrand = asyncHandler(async (req, res) => {
    uploadBrandLogo(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        try {
            const response = await BrandService.createBrand(req.body, req.file);
            res.status(response.code).json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: 'error',
                code: error.statusCode || 500,
                message: error.message,
            });
        }
    });
});

exports.updateBrand = asyncHandler(async (req, res) => {
    uploadBrandLogo(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        try {
            const response = await BrandService.updateBrand(req.params.id, req.body, req.file);
            res.status(response.code).json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: 'error',
                code: error.statusCode || 500,
                message: error.message,
            });
        }
    });
});

exports.deleteBrand = asyncHandler(async (req, res) => {
    const response = await BrandService.deleteBrand(req.params.id);
    res.status(response.code).json(response);
});