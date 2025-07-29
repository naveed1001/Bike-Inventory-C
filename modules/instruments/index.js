const instrumentsController = require('./instrumentsController');
const InstrumentsRepository = require('./instrumentsRepository');
const InstrumentsService = require('./instrumentsService');
const instrumentsRouter = require('./instrumentsRoutes');

module.exports = {
    instrumentsController,
    InstrumentsRepository,
    InstrumentsService,
    instrumentsRouter,
};