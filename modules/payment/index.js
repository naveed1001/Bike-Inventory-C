const paymentController = require('./paymentController');
const PaymentRepository = require('./paymentRepository');
const PaymentService = require('./paymentService');
const paymentRouter = require('./paymentRoutes');

module.exports = {
    paymentController,
    PaymentRepository,
    PaymentService,
    paymentRouter,
};