const shippingAgentController = require('./shippingAgentController');
const ShippingAgentRepository = require('./shippingAgentRepository');
const ShippingAgentService = require('./shippingAgentService');
const shippingAgentRouter = require('./shippingAgentRoutes');

module.exports = {
    shippingAgentController,
    ShippingAgentRepository,
    ShippingAgentService,
    shippingAgentRouter,
};