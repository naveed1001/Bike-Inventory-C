const paymentDetailController = require('./paymentDetailController');
const PaymentDetailRepository = require('./paymentDetailRepository');
const PaymentDetailService = require('./paymentDetailService');
const paymentDetailRouter = require('./paymentDetailRoutes');

module.exports = {
    paymentDetailController,
    PaymentDetailRepository,
    PaymentDetailService,
    paymentDetailRouter,
};