const express = require('express');
const router = express.Router();
const itemTypesController = require('./itemTypesController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-item-types', authenticate, authorize('item_types_read'), itemTypesController.getAllItemTypes);
router.get('/get-item-type/:id', authenticate, authorize('item_types_read'), itemTypesController.getItemTypeById);
router.post('/create-item-type', authenticate, authorize('item_types_create'), itemTypesController.createItemType);
router.put('/update-item-type/:id', authenticate, authorize('item_types_update'), itemTypesController.updateItemType);
router.delete('/delete-item-type/:id', authenticate, authorize('item_types_delete'), itemTypesController.deleteItemType);

module.exports = router;