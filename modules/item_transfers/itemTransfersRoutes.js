const express = require('express');
const router = express.Router();
const itemTransfersController = require('./itemTransfersController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-item-transfers', authenticate, authorize('item_transfers_read'), itemTransfersController.getAllItemTransfers);
router.get('/get-item-transfer/:id', authenticate, authorize('item_transfers_read'), itemTransfersController.getItemTransferById);
router.post('/create-item-transfer', authenticate, authorize('item_transfers_create'), itemTransfersController.createItemTransfer);
router.put('/update-item-transfer/:id', authenticate, authorize('item_transfers_update'), itemTransfersController.updateItemTransfer);
router.delete('/delete-item-transfer/:id', authenticate, authorize('item_transfers_delete'), itemTransfersController.deleteItemTransfer);

module.exports = router;