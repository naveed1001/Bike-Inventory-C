const brandController = require('./brandController');
const BrandRepository = require('./brandRepository');
const BrandService = require('./brandService');
const brandRouter = require('./brandRoutes');

module.exports = {
    brandController,
    BrandRepository,
    BrandService,
    brandRouter,
};