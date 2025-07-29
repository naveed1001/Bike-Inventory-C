const express = require('express');
const rolesController = require('./rolesController');
const router = express.Router();
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-roles/', authenticate, authorize('roles_read'), rolesController.getAllRoles);
router.get('/get-role/:id', authenticate, authorize('roles_read'), rolesController.getRoleById);
router.post('/create-role/', authenticate, authorize('roles_create'), rolesController.createRole);
router.put('/update-role/:id', authenticate, authorize('roles_update'), rolesController.updateRole);
router.delete('/delete-role/:id', authenticate, authorize('roles_delete'), rolesController.deleteRole);

module.exports = router;