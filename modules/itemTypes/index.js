const itemTypesController = require('./itemTypesController');
const ItemTypesRepository = require('./itemTypesRepository');
const ItemTypesService = require('./itemTypesService');
const itemTypesRouter = require('./itemTypesRoutes');

module.exports = {
    itemTypesController,
    ItemTypesRepository,
    ItemTypesService,
    itemTypesRouter,
};