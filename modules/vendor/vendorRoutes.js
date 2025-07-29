const express = require('express');
const router = express.Router();
const vendorController = require('./vendorController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-vendors', authenticate, authorize('vendor_read'), vendorController.getAllVendors);
router.get('/get-vendor/:id', authenticate, authorize('vendor_read'), vendorController.getVendorById);
router.post('/create-vendor', authenticate, authorize('vendor_create'), vendorController.createVendor);
router.put('/update-vendor/:id', authenticate, authorize('vendor_update'), vendorController.updateVendor);
router.delete('/delete-vendor/:id', authenticate, authorize('vendor_delete'), vendorController.deleteVendor);

module.exports = router;