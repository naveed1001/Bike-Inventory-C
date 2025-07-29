const installmentController = require('./installmentController');
const InstallmentRepository = require('./installmentRepository');
const InstallmentService = require('./installmentService');
const installmentRouter = require('./installmentRoutes');

module.exports = {
    installmentController,
    InstallmentRepository,
    InstallmentService,
    installmentRouter,
};