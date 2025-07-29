const express = require('express');
const router = express.Router();
const dealershipController = require('./dealershipController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-dealerships', authenticate, authorize('dealership_read'), dealershipController.getAllDealerships);
router.get('/get-dealership/:id', authenticate, authorize('dealership_read'), dealershipController.getDealershipById);
router.post('/create-dealership', authenticate, authorize('dealership_create'), dealershipController.createDealership);
router.put('/update-dealership/:id', authenticate, authorize('dealership_update'), dealershipController.updateDealership);
router.delete('/delete-dealership/:id', authenticate, authorize('dealership_delete'), dealershipController.deleteDealership);

module.exports = router;