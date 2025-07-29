const salesController = require('./salesController');
const SalesRepository = require('./salesRepository');
const SalesService = require('./salesService');
const salesRouter = require('./salesRoutes');

module.exports = {
    salesController,
    SalesRepository,
    SalesService,
    salesRouter,
};