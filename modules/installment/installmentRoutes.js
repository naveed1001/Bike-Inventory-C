const express = require('express');
const router = express.Router();
const installmentController = require('./installmentController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-installments', authenticate, authorize('installment_read'), installmentController.getAllInstallments);
router.get('/get-installment/:id', authenticate, authorize('installment_read'), installmentController.getInstallmentById);
router.post('/create-installment', authenticate, authorize('installment_create'), installmentController.createInstallment);
router.put('/update-installment/:id', authenticate, authorize('installment_update'), installmentController.updateInstallment);
router.delete('/delete-installment/:id', authenticate, authorize('installment_delete'), installmentController.deleteInstallment);

module.exports = router;