const express = require('express');
const router = express.Router();
const dealerController = require('./dealerController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-dealers', authenticate, authorize('dealer_read'), dealerController.getAllDealers);
router.get('/get-dealer/:id', authenticate, authorize('dealer_read'), dealerController.getDealerById);
router.post('/create-dealer', authenticate, authorize('dealer_create'), dealerController.createDealer);
router.put('/update-dealer/:id', authenticate, authorize('dealer_update'), dealerController.updateDealer);
router.delete('/delete-dealer/:id', authenticate, authorize('dealer_delete'), dealerController.deleteDealer);

module.exports = router;