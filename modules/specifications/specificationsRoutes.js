const express = require('express');
const router = express.Router();
const specificationsController = require('./specificationsController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-specifications', authenticate, authorize('specifications_read'), specificationsController.getAllSpecifications);
router.get('/get-specification/:id', authenticate, authorize('specifications_read'), specificationsController.getSpecificationById);
router.post('/create-specification', authenticate, authorize('specifications_create'), specificationsController.createSpecification);
router.put('/update-specification/:id', authenticate, authorize('specifications_update'), specificationsController.updateSpecification);
router.delete('/delete-specification/:id', authenticate, authorize('specifications_delete'), specificationsController.deleteSpecification);

module.exports = router;