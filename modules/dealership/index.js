const dealershipController = require('./dealershipController');
const DealershipRepository = require('./dealershipRepository');
const DealershipService = require('./dealershipService');
const dealershipRouter = require('./dealershipRoutes');

module.exports = {
    dealershipController,
    DealershipRepository,
    DealershipService,
    dealershipRouter,
};