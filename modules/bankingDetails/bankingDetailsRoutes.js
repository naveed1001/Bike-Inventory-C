const express = require('express');
const router = express.Router();
const bankingDetailsController = require('./bankingDetailsController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-banking-details/', authenticate, authorize('banking_details_read'), bankingDetailsController.getAllBankingDetails);
router.get('/get-banking-detail/:id', authenticate, authorize('banking_details_read'), bankingDetailsController.getBankingDetailById);
router.post('/create-banking-detail/', authenticate, authorize('banking_details_create'), bankingDetailsController.createBankingDetail);
router.put('/update-banking-detail/:id', authenticate, authorize('banking_details_update'), bankingDetailsController.updateBankingDetail);
router.delete('/delete-banking-detail/:id', authenticate, authorize('banking_details_delete'), bankingDetailsController.deleteBankingDetail);

module.exports = router;