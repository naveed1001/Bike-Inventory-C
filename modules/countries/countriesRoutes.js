const express = require('express');
const router = express.Router();
const countriesController = require('./countriesController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-countries/', authenticate, authorize('countries_read'), countriesController.getAllCountries);
router.get('/get-country/:id', authenticate, authorize('countries_read'), countriesController.getCountryById);
router.post('/create-country/', authenticate, authorize('countries_create'), countriesController.createCountry);
router.put('/update-country/:id', authenticate, authorize('countries_update'), countriesController.updateCountry);
router.delete('/delete-country/:id', authenticate, authorize('countries_delete'), countriesController.deleteCountry);

module.exports = router;