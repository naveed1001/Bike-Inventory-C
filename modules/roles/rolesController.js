const RolesService = require('./rolesService');
const asyncHandler = require("../../utils/asyncHandler");

exports.getAllRoles = asyncHandler(async (req, res) => {
    const response = await RolesService.getAllRoles();
    res.status(response.code).json(response);
});

exports.getRoleById = asyncHandler(async (req, res) => {
    const response = await RolesService.getRoleById(req.params.id);
    res.status(response.code).json(response);
});

exports.createRole = asyncHandler(async (req, res) => {
    const response = await RolesService.createRole(req.body);
    res.status(response.code).json(response);
});

exports.updateRole = asyncHandler(async (req, res) => {
    const response = await RolesService.updateRole(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteRole = asyncHandler(async (req, res) => {
    const response = await RolesService.deleteRole(req.params.id);
    res.status(response.code).json(response);
});
