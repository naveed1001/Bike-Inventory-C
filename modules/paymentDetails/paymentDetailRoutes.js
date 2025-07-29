const express = require('express');
const router = express.Router();
const paymentDetailController = require('./paymentDetailController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-payment-details', authenticate, authorize('payment_detail_read'), paymentDetailController.getAllPaymentDetails);
router.get('/get-payment-detail/:id', authenticate, authorize('payment_detail_read'), paymentDetailController.getPaymentDetailById);
router.post('/create-payment-detail', authenticate, authorize('payment_detail_create'), paymentDetailController.createPaymentDetail);
router.put('/update-payment-detail/:id', authenticate, authorize('payment_detail_update'), paymentDetailController.updatePaymentDetail);
router.delete('/delete-payment-detail/:id', authenticate, authorize('payment_detail_delete'), paymentDetailController.deletePaymentDetail);

module.exports = router;