const express = require('express');
const router = express.Router();
const organizationController = require('./organizationController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-organizations', authenticate, authorize('organizations_read'), organizationController.getAllOrganizations);
router.get('/get-organization/:id', authenticate, authorize('organizations_read'), organizationController.getOrganizationById);
router.post('/create-organization', authenticate, authorize('organizations_create'), organizationController.createOrganization);
router.put('/update-organization/:id', authenticate, authorize('organizations_update'), organizationController.updateOrganization);
router.delete('/delete-organization/:id', authenticate, authorize('organizations_delete'), organizationController.deleteOrganization);

module.exports = router;