const express = require('express');
const router = express.Router();
const entityBankingController = require('./entityBankingController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-entity-bankings', authenticate, authorize('entity_banking_read'), entityBankingController.getAllEntityBankings);
router.get('/get-entity-banking/:id', authenticate, authorize('entity_banking_read'), entityBankingController.getEntityBankingById);
router.post('/create-entity-banking', authenticate, authorize('entity_banking_create'), entityBankingController.createEntityBanking);
router.put('/update-entity-banking/:id', authenticate, authorize('entity_banking_update'), entityBankingController.updateEntityBanking);
router.delete('/delete-entity-banking/:id', authenticate, authorize('entity_banking_delete'), entityBankingController.deleteEntityBanking);

module.exports = router;