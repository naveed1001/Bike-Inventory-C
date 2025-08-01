const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'bike-inventory-api'
    });
});

router.get('/cicd-working', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Congratulations! CI/CD Working!!'
    });
});

const roles = require('./roles');
const permissions = require('./permissions');
const bankingDetails = require('./bankingDetails');
const countries = require('./countries');
const cities = require('./cities');
const status = require('./status');
const brand = require('./brand');
const vendor = require('./vendor');
const users = require('./users');
const organization = require('./organization');
const warehouse = require('./warehouse');
const itemTypes = require('./itemTypes');
const capacityTypes = require('./capacityTypes');
const item = require('./item');
const specifications = require('./specifications');
const payment = require('./payment');
const installmentPlan = require('./InstallmentPlan');
const instruments = require('./instruments');
const installment = require('./installment');
const paymentDetail = require('./paymentDetails');
const dealer = require('./dealer');
const dealership = require('./dealership');
const customer = require('./customer');
const sales = require('./sales');
const shippingAgent = require('./shipping_agent');
const shipment = require('./shipment');
const entityBanking = require('./entity_banking');
const itemTransfers = require('./item_transfers');


router.use('/roles', roles.router);
router.use('/permissions', permissions.router);
router.use('/banking-details', bankingDetails.bankingDetailsRouter);
router.use('/countries', countries.countriesRouter);
router.use('/cities', cities.citiesRouter);
router.use('/status', status.statusRouter);
router.use('/brand', brand.brandRouter);
router.use('/vendor', vendor.vendorRouter);
router.use('/users', users.usersRouter);
router.use('/organizations', organization.organizationRouter);
router.use('/warehouses', warehouse.warehouseRouter);
router.use('/item-types', itemTypes.itemTypesRouter);
router.use('/capacity-types', capacityTypes.capacityTypesRouter);
router.use('/items', item.itemRouter);
router.use('/specifications', specifications.specificationsRouter);
router.use('/payments', payment.paymentRouter);
router.use('/installment-plans', installmentPlan.installmentPlanRouter);
router.use('/instruments', instruments.instrumentsRouter);
router.use('/installments', installment.installmentRouter);
router.use('/payment-details', paymentDetail.paymentDetailRouter);
router.use('/dealers', dealer.dealerRouter);
router.use('/dealerships', dealership.dealershipRouter);
router.use('/customers', customer.customerRouter);
router.use('/sales', sales.salesRouter);
router.use('/shipping-agents', shippingAgent.shippingAgentRouter);
router.use('/shipments', shipment.shipmentRouter);
router.use('/entity-bankings', entityBanking.entityBankingRouter);
router.use('/item-transfers', itemTransfers.itemTransfersRouter);


module.exports = router;