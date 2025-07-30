const { validateCreateOrganization, validateUpdateOrganization } = require('./organizationValidator');
const { ApiError, ApiResponse } = require('../../utils');
const OrganizationRepository = require('./organizationRepository');
const { StatusCodes } = require('http-status-codes');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Initialize S3 client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Utility function to extract S3 key from URL
const getS3KeyFromUrl = (url) => {
    if (!url) return null;
    const urlObj = new URL(url);
    return decodeURIComponent(urlObj.pathname.substring(1)); // Remove leading '/' from pathname
};

class OrganizationService {
    async getAllOrganizations() {
        const organizations = await OrganizationRepository.findAllOrganizations();
        const organizationsWithPresignedUrls = await Promise.all(organizations.map(async (organization) => {
            if (organization.logo) {
                const key = getS3KeyFromUrl(organization.logo);
                organization.logoPresignedUrl = await getSignedUrl(s3, new GetObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: key,
                }), { expiresIn: 3600 });
            }
            return organization;
        }));
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Organizations retrieved successfully',
            payload: { organizations: organizationsWithPresignedUrls }
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
        if (organization.logo) {
            const key = getS3KeyFromUrl(organization.logo);
            organization.logoPresignedUrl = await getSignedUrl(s3, new GetObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key,
            }), { expiresIn: 3600 });
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

        const { name, website, address, vendor_id, admin_id, banking_id } = data;
        const logoUrl = file ? file.location : null;
        const logoPresignedUrl = file ? file.presignedUrl : null;

        const organization = await OrganizationRepository.createOrganization(
            name,
            logoUrl,
            website,
            address,
            vendor_id,
            admin_id,
            banking_id
        );
        organization.logoPresignedUrl = logoPresignedUrl;

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

        const { name, website, address, vendor_id, admin_id, banking_id } = data;
        const logoUrl = file ? file.location : null;
        const logoPresignedUrl = file ? file.presignedUrl : null;

        const organization = await OrganizationRepository.updateOrganization(
            parsedId,
            name,
            logoUrl,
            website,
            address,
            vendor_id,
            admin_id,
            banking_id
        );
        if (!organization) {
            throw new ApiError('Organization not found', StatusCodes.NOT_FOUND);
        }
        organization.logoPresignedUrl = logoPresignedUrl;

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