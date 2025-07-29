const express = require('express');
const router = express.Router();
const shipmentController = require('./shipmentController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-shipments', authenticate, authorize('shipment_read'), shipmentController.getAllShipments);
router.get('/get-shipment/:id', authenticate, authorize('shipment_read'), shipmentController.getShipmentById);
router.post('/create-shipment', authenticate, authorize('shipment_create'), shipmentController.createShipment);
router.put('/update-shipment/:id', authenticate, authorize('shipment_update'), shipmentController.updateShipment);
router.delete('/delete-shipment/:id', authenticate, authorize('shipment_delete'), shipmentController.deleteShipment);

module.exports = router;