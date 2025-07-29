const express = require('express');
const router = express.Router();
const capacityTypesController = require('./capacityTypesController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-capacity-types', authenticate, authorize('capacity_types_read'), capacityTypesController.getAllCapacityTypes);
router.get('/get-capacity-type/:id', authenticate, authorize('capacity_types_read'), capacityTypesController.getCapacityTypeById);
router.post('/create-capacity-type', authenticate, authorize('capacity_types_create'), capacityTypesController.createCapacityType);
router.put('/update-capacity-type/:id', authenticate, authorize('capacity_types_update'), capacityTypesController.updateCapacityType);
router.delete('/delete-capacity-type/:id', authenticate, authorize('capacity_types_delete'), capacityTypesController.deleteCapacityType);

module.exports = router;