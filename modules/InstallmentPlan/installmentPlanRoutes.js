const express = require('express');
const router = express.Router();
const installmentPlanController = require('./installmentPlanController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-installment-plans', authenticate, authorize('installment_plan_read'), installmentPlanController.getAllInstallmentPlans);
router.get('/get-installment-plan/:id', authenticate, authorize('installment_plan_read'), installmentPlanController.getInstallmentPlanById);
router.post('/create-installment-plan', authenticate, authorize('installment_plan_create'), installmentPlanController.createInstallmentPlan);
router.put('/update-installment-plan/:id', authenticate, authorize('installment_plan_update'), installmentPlanController.updateInstallmentPlan);
router.delete('/delete-installment-plan/:id', authenticate, authorize('installment_plan_delete'), installmentPlanController.deleteInstallmentPlan);

module.exports = router;