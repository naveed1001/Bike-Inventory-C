const express = require('express');
const router = express.Router();
const paymentController = require('./paymentController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-payments', authenticate, authorize('payment_read'), paymentController.getAllPayments);
router.get('/get-payment/:id', authenticate, authorize('payment_read'), paymentController.getPaymentById);
router.post('/create-payment', authenticate, authorize('payment_create'), paymentController.createPayment);
router.put('/update-payment/:id', authenticate, authorize('payment_update'), paymentController.updatePayment);
router.delete('/delete-payment/:id', authenticate, authorize('payment_delete'), paymentController.deletePayment);

module.exports = router;