const asyncHandler = require("../../utils/asyncHandler");
const OrganizationService = require('./organizationService');
const { uploadOrganizationLogo } = require('../../middlewares/multer');

exports.getAllOrganizations = asyncHandler(async (req, res) => {
    const response = await OrganizationService.getAllOrganizations();
    res.status(response.code).json(response);
});

exports.getOrganizationById = asyncHandler(async (req, res) => {
    const response = await OrganizationService.getOrganizationById(req.params.id);
    res.status(response.code).json(response);
});

exports.createOrganization = asyncHandler(async (req, res) => {
    uploadOrganizationLogo(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        const response = await OrganizationService.createOrganization(req.body, req.file);
        res.status(response.code).json(response);
    });
});

exports.updateOrganization = asyncHandler(async (req, res) => {
    uploadOrganizationLogo(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        const response = await OrganizationService.updateOrganization(req.params.id, req.body, req.file);
        res.status(response.code).json(response);
    });
});

exports.deleteOrganization = asyncHandler(async (req, res) => {
    const response = await OrganizationService.deleteOrganization(req.params.id);
    res.status(response.code).json(response);
});