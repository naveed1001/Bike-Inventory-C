const vendorController = require('./vendorController');
const VendorRepository = require('./vendorRepository');
const VendorService = require('./vendorService');
const vendorRouter = require('./vendorRoutes');

module.exports = {
    vendorController,
    VendorRepository,
    VendorService,
    vendorRouter,
};