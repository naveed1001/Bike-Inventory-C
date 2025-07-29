const organizationController = require('./organizationController');
const OrganizationRepository = require('./organizationRepository');
const OrganizationService = require('./organizationService');
const organizationRouter = require('./organizationRoutes');

module.exports = {
    organizationController,
    OrganizationRepository,
    OrganizationService,
    organizationRouter,
};