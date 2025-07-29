const customerController = require('./customerController');
const CustomerRepository = require('./customerRepository');
const CustomerService = require('./customerService');
const customerRouter = require('./customerRoutes');

module.exports = {
    customerController,
    CustomerRepository,
    CustomerService,
    customerRouter,
};