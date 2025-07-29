const express = require('express');
const router = express.Router();
const statusController = require('./statusController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-statuses', authenticate, authorize('status_read'), statusController.getAllStatuses);
router.get('/get-status/:id', authenticate, authorize('status_read'), statusController.getStatusById);
router.post('/create-status', authenticate, authorize('status_create'), statusController.createStatus);
router.put('/update-status/:id', authenticate, authorize('status_update'), statusController.updateStatus);
router.delete('/delete-status/:id', authenticate, authorize('status_delete'), statusController.deleteStatus);

module.exports = router;