const capacityTypesController = require('./capacityTypesController');
const CapacityTypesRepository = require('./capacityTypesRepository');
const CapacityTypesService = require('./capacityTypesService');
const capacityTypesRouter = require('./capacityTypesRoutes');

module.exports = {
    capacityTypesController,
    CapacityTypesRepository,
    CapacityTypesService,
    capacityTypesRouter,
};