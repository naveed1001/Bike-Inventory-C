const express = require('express');
const router = express.Router();
const permissionsController = require('./permissionsController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-permissions/', authenticate, authorize('permissions_read'), permissionsController.getAllPermissions);
router.get('/get-permission/:id', authenticate, authorize('permissions_read'), permissionsController.getPermissionById);
router.post('/create-permission/', authenticate, authorize('permissions_create'), permissionsController.createPermission);
router.put('/update-permission/:id', authenticate, authorize('permissions_update'), permissionsController.updatePermission);
router.delete('/delete-permission/:id', authenticate, authorize('permissions_delete'), permissionsController.deletePermission);
router.post('/assign-permission/', authenticate, authorize('role_permissions_assign'), permissionsController.assignPermission);
router.delete('/unassign-permission/', authenticate, authorize('role_permissions_unassign'), permissionsController.unassignPermission);

module.exports = router;