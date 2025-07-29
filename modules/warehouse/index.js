const warehouseController = require('./warehouseController');
const WarehouseRepository = require('./warehouseRepository');
const WarehouseService = require('./warehouseService');
const warehouseRouter = require('./warehouseRoutes');

module.exports = {
    warehouseController,
    WarehouseRepository,
    WarehouseService,
    warehouseRouter,
};