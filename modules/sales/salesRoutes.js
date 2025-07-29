const express = require('express');
const router = express.Router();
const salesController = require('./salesController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-sales', authenticate, authorize('sales_read'), salesController.getAllSales);
router.get('/get-sale/:id', authenticate, authorize('sales_read'), salesController.getSaleById);
router.post('/create-sale', authenticate, authorize('sales_create'), salesController.createSale);
router.put('/update-sale/:id', authenticate, authorize('sales_update'), salesController.updateSale);
router.delete('/delete-sale/:id', authenticate, authorize('sales_delete'), salesController.deleteSale);

module.exports = router;