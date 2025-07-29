const { validateCreateRole, validateUpdateRole } = require('./rolesValidator');
const { ApiError, ApiResponse } = require('../../utils');
const RolesRepository = require('./rolesRepository');
const { StatusCodes } = require("http-status-codes");

class RolesService {
    async getAllRoles() {
        const roles = await RolesRepository.findAll();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Roles retrieved successfully',
            payload: roles,
        });
    }

    async getRoleById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid role ID', StatusCodes.BAD_REQUEST);
        }
        const role = await RolesRepository.findById(parsedId);
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Role retrieved successfully',
            payload: role,
        });
    }

    async createRole(data) {
        const { error } = validateCreateRole(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { role_name } = data;
        const role = await RolesRepository.create({ role_name });
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Role created successfully',
            payload: role,
        });
    }

    async updateRole(id, data) {
        const { error } = validateUpdateRole(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid role ID', StatusCodes.BAD_REQUEST);
        }
        const { role_name } = data;
        const role = await RolesRepository.update(parsedId, { role_name });
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Role updated successfully',
            payload: role,
        });
    }

    async deleteRole(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid role ID', StatusCodes.BAD_REQUEST);
        }
        const result = await RolesRepository.deleteRole(parsedId);
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Role soft deleted successfully',
            payload: result,
        });
    }
}

module.exports = new RolesService();