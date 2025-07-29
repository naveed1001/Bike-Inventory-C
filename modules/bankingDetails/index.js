const bankingDetailsController = require('./bankingDetailsController');
const BankingDetailsRepository = require('./bankingDetailsRepository');
const BankingDetailsService = require('./bankingDetailsService');
const bankingDetailsRouter = require('./bankingDetailsRoutes');

module.exports = {
    bankingDetailsController,
    BankingDetailsRepository,
    BankingDetailsService,
    bankingDetailsRouter,
};