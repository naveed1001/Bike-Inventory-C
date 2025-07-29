const PermissionsService = require('./permissionsService');
const asyncHandler = require("../../utils/asyncHandler");

exports.getAllPermissions = asyncHandler(async (req, res) => {
    const response = await PermissionsService.getAllPermissions();
    res.status(response.code).json(response);
});

exports.getPermissionById = asyncHandler(async (req, res) => {
    const response = await PermissionsService.getPermissionById(req.params.id);
    res.status(response.code).json(response);
});

exports.createPermission = asyncHandler(async (req, res) => {
    const response = await PermissionsService.createPermission(req.body);
    res.status(response.code).json(response);
});

exports.updatePermission = asyncHandler(async (req, res) => {
    const response = await PermissionsService.updatePermission(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deletePermission = asyncHandler(async (req, res) => {
    const response = await PermissionsService.deletePermission(req.params.id);
    res.status(response.code).json(response);
});

exports.assignPermission = asyncHandler(async (req, res) => {
    const { role_id, permission_id } = req.body;
    const response = await PermissionsService.assignPermission(role_id, permission_id);
    res.status(response.code).json(response);
});

exports.unassignPermission = asyncHandler(async (req, res) => {
    const { role_id, permission_id } = req.body;
    const response = await PermissionsService.unassignPermission(role_id, permission_id);
    res.status(response.code).json(response);
});