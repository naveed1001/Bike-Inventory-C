const express = require('express');
const router = express.Router();
const brandController = require('./brandController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-brands', authenticate, authorize('brand_read'), brandController.getAllBrands);
router.get('/get-brand/:id', authenticate, authorize('brand_read'), brandController.getBrandById);
router.post('/create-brand', authenticate, authorize('brand_create'), brandController.createBrand);
router.put('/update-brand/:id', authenticate, authorize('brand_update'), brandController.updateBrand);
router.delete('/delete-brand/:id', authenticate, authorize('brand_delete'), brandController.deleteBrand);

module.exports = router;