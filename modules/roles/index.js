const rolesController = require('./rolesController');
const RolesRepository = require('./rolesRepository');
const RolesService = require('./rolesService');
const router = require('./rolesRoutes');

module.exports = {
    rolesController,
    RolesRepository,
    RolesService,
    router,
};