const specificationsController = require('./specificationsController');
const SpecificationsRepository = require('./specificationsRepository');
const SpecificationsService = require('./specificationsService');
const specificationsRouter = require('./specificationsRoutes');

module.exports = {
    specificationsController,
    SpecificationsRepository,
    SpecificationsService,
    specificationsRouter,
};