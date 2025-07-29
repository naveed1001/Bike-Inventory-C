const { validateCreateOrganization, validateUpdateOrganization } = require('./organizationValidator');
const { ApiError, ApiResponse } = require('../../utils');
const OrganizationRepository = require('./organizationRepository');
const { StatusCodes } = require('http-status-codes');

class OrganizationService {
    async getAllOrganizations() {
        const organizations = await OrganizationRepository.findAllOrganizations();
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Organizations retrieved successfully',
            payload: { organizations }
        });
    }

    async getOrganizationById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid organization ID', StatusCodes.BAD_REQUEST);
        }
        const organization = await OrganizationRepository.findOrganizationById(parsedId);
        if (!organization) {
            throw new ApiError('Organization not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Organization retrieved successfully',
            payload: organization
        });
    }

    async createOrganization(data, file) {
        const { error } = validateCreateOrganization(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, logo, website, address, vendor_id, admin_id, banking_id } = data;
        const logoPath = file ? file.path : logo; // Use uploaded file path if available, otherwise use provided logo URL

        const organization = await OrganizationRepository.createOrganization(
            name,
            logoPath,
            website,
            address,
            vendor_id,
            admin_id,
            banking_id
        );
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Organization created successfully',
            payload: organization
        });
    }

    async updateOrganization(id, data, file) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid organization ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateOrganization(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { name, logo, website, address, vendor_id, admin_id, banking_id } = data;
        const logoPath = file ? file.path : logo; // Use uploaded file path if available, otherwise use provided logo URL

        const organization = await OrganizationRepository.updateOrganization(
            parsedId,
            name,
            logoPath,
            website,
            address,
            vendor_id,
            admin_id,
            banking_id
        );
        if (!organization) {
            throw new ApiError('Organization not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Organization updated successfully',
            payload: organization
        });
    }

    async deleteOrganization(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid organization ID', StatusCodes.BAD_REQUEST);
        }
        const success = await OrganizationRepository.deleteOrganization(parsedId);
        if (!success) {
            throw new ApiError('Organization not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Organization soft deleted successfully',
            payload: { message: 'Organization soft deleted successfully' }
        });
    }
}

module.exports = new OrganizationService();