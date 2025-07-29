const { validateCreatePermission, validateUpdatePermission } = require('./permissionsValidator');
const { ApiError, ApiResponse } = require('../../utils');
const PermissionsRepository = require('./permissionsRepository');
const { StatusCodes } = require("http-status-codes");

class PermissionsService {
    async getAllPermissions() {
        const permissions = await PermissionsRepository.findAll();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Permissions retrieved successfully',
            payload: permissions,
        });
    }

    async getPermissionById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid permission ID', StatusCodes.BAD_REQUEST);
        }
        const permission = await PermissionsRepository.findById(parsedId);
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Permission retrieved successfully',
            payload: permission,
        });
    }

    async createPermission(data) {
        const { error } = validateCreatePermission(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { permission_name, permission_key } = data;
        const permission = await PermissionsRepository.create({ permission_name, permission_key });
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Permission created successfully',
            payload: permission,
        });
    }

    async updatePermission(id, data) {
        const { error } = validateUpdatePermission(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid permission ID', StatusCodes.BAD_REQUEST);
        }
        const { permission_name, permission_key } = data;
        const permission = await PermissionsRepository.update(parsedId, { permission_name, permission_key });
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Permission updated successfully',
            payload: permission,
        });
    }

    async deletePermission(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid permission ID', StatusCodes.BAD_REQUEST);
        }
        const result = await PermissionsRepository.deletePermission(parsedId);
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Permission soft deleted successfully',
            payload: result,
        });
    }

    async assignPermission(roleId, permissionId) {
        const parsedRoleId = parseInt(roleId, 10);
        const parsedPermissionId = parseInt(permissionId, 10);
        if (isNaN(parsedRoleId) || parsedRoleId <= 0 || isNaN(parsedPermissionId) || parsedPermissionId <= 0) {
            throw new ApiError('Invalid role ID or permission ID', StatusCodes.BAD_REQUEST);
        }
        const result = await PermissionsRepository.assignPermission(parsedRoleId, parsedPermissionId);
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Permission assigned successfully',
            payload: result,
        });
    }

    async unassignPermission(roleId, permissionId) {
        const parsedRoleId = parseInt(roleId, 10);
        const parsedPermissionId = parseInt(permissionId, 10);
        if (isNaN(parsedRoleId) || parsedRoleId <= 0 || isNaN(parsedPermissionId) || parsedPermissionId <= 0) {
            throw new ApiError('Invalid role ID or permission ID', StatusCodes.BAD_REQUEST);
        }
        const result = await PermissionsRepository.unassignPermission(parsedRoleId, parsedPermissionId);
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Permission unassigned successfully',
            payload: result,
        });
    }
}

module.exports = new PermissionsService();