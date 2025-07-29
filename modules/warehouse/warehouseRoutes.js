const express = require('express');
const router = express.Router();
const warehouseController = require('./warehouseController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-warehouses', authenticate, authorize('warehouse_read'), warehouseController.getAllWarehouses);
router.get('/get-warehouse/:id', authenticate, authorize('warehouse_read'), warehouseController.getWarehouseById);
router.post('/create-warehouse', authenticate, authorize('warehouse_create'), warehouseController.createWarehouse);
router.put('/update-warehouse/:id', authenticate, authorize('warehouse_update'), warehouseController.updateWarehouse);
router.delete('/delete-warehouse/:id', authenticate, authorize('warehouse_delete'), warehouseController.deleteWarehouse);

module.exports = router;