const express = require('express');
const router = express.Router();
const customerController = require('./customerController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-customers', authenticate, authorize('customer_read'), customerController.getAllCustomers);
router.get('/get-customer/:id', authenticate, authorize('customer_read'), customerController.getCustomerById);
router.post('/create-customer', authenticate, authorize('customer_create'), customerController.createCustomer);
router.put('/update-customer/:id', authenticate, authorize('customer_update'), customerController.updateCustomer);
router.delete('/delete-customer/:id', authenticate, authorize('customer_delete'), customerController.deleteCustomer);

module.exports = router;