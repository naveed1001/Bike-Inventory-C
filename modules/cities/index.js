const citiesController = require('./citiesController');
const CitiesRepository = require('./citiesRepository');
const CitiesService = require('./citiesService');
const citiesRouter = require('./citiesRoutes');

module.exports = {
    citiesController,
    CitiesRepository,
    CitiesService,
    citiesRouter,
};