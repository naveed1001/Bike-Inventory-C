const asyncHandler = require("../../utils/asyncHandler");
const InstallmentPlanService = require('./installmentPlanService');

exports.getAllInstallmentPlans = asyncHandler(async (req, res) => {
    const response = await InstallmentPlanService.getAllInstallmentPlans();
    res.status(response.code).json(response);
});

exports.getInstallmentPlanById = asyncHandler(async (req, res) => {
    const response = await InstallmentPlanService.getInstallmentPlanById(req.params.id);
    res.status(response.code).json(response);
});

exports.createInstallmentPlan = asyncHandler(async (req, res) => {
    const response = await InstallmentPlanService.createInstallmentPlan(req.body);
    res.status(response.code).json(response);
});

exports.updateInstallmentPlan = asyncHandler(async (req, res) => {
    const response = await InstallmentPlanService.updateInstallmentPlan(req.params.id, req.body);
    res.status(response.code).json(response);
});

exports.deleteInstallmentPlan = asyncHandler(async (req, res) => {
    const response = await InstallmentPlanService.deleteInstallmentPlan(req.params.id);
    res.status(response.code).json(response);
});