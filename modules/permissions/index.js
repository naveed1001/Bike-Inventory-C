const permissionsController = require('./permissionsController');
const PermissionsRepository = require('./permissionsRepository');
const PermissionsService = require('./permissionsService');
const router = require('./permissionsRoutes');

module.exports = {
    permissionsController,
    PermissionsRepository,
    PermissionsService,
    router,
};