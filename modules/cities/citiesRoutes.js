const express = require('express');
const router = express.Router();
const citiesController = require('./citiesController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.get('/get-cities', authenticate, authorize('cities_read'), citiesController.getAllCities);
router.get('/get-city/:id', authenticate, authorize('cities_read'), citiesController.getCityById);
router.post('/create-city', authenticate, authorize('cities_create'), citiesController.createCity);
router.put('/update-city/:id', authenticate, authorize('cities_update'), citiesController.updateCity);
router.delete('/delete-city/:id', authenticate, authorize('cities_delete'), citiesController.deleteCity);

module.exports = router;