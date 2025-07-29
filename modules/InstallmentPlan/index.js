const installmentPlanController = require('./installmentPlanController');
const InstallmentPlanRepository = require('./installmentPlanRepository');
const InstallmentPlanService = require('./installmentPlanService');
const installmentPlanRouter = require('./installmentPlanRoutes');

module.exports = {
    installmentPlanController,
    InstallmentPlanRepository,
    InstallmentPlanService,
    installmentPlanRouter,
};