const express = require('express');
const router = express.Router();
const shippingAgentController = require('./shippingAgentController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-shipping-agents', authenticate, authorize('shipping_agent_read'), shippingAgentController.getAllShippingAgents);
router.get('/get-shipping-agent/:id', authenticate, authorize('shipping_agent_read'), shippingAgentController.getShippingAgentById);
router.post('/create-shipping-agent', authenticate, authorize('shipping_agent_create'), shippingAgentController.createShippingAgent);
router.put('/update-shipping-agent/:id', authenticate, authorize('shipping_agent_update'), shippingAgentController.updateShippingAgent);
router.delete('/delete-shipping-agent/:id', authenticate, authorize('shipping_agent_delete'), shippingAgentController.deleteShippingAgent);

module.exports = router;