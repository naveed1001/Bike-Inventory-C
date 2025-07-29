const shipmentController = require('./shipmentController');
const ShipmentRepository = require('./shipmentRepository');
const ShipmentService = require('./shipmentService');
const shipmentRouter = require('./shipmentRoutes');

module.exports = {
    shipmentController,
    ShipmentRepository,
    ShipmentService,
    shipmentRouter,
};