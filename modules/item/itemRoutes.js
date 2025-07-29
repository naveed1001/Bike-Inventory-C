const express = require('express');
const router = express.Router();
const itemController = require('./itemController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-items', authenticate, authorize('item_read'), itemController.getAllItems);
router.get('/get-item/:id', authenticate, authorize('item_read'), itemController.getItemById);
router.post('/create-item', authenticate, authorize('item_create'), itemController.createItem);
router.put('/update-item/:id', authenticate, authorize('item_update'), itemController.updateItem);
router.delete('/delete-item/:id', authenticate, authorize('item_delete'), itemController.deleteItem);

module.exports = router; 