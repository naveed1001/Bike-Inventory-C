const countriesController = require('./countriesController');
const CountriesRepository = require('./countriesRepository');
const CountriesService = require('./countriesService');
const countriesRouter = require('./countriesRoutes');

module.exports = {
    countriesController,
    CountriesRepository,
    CountriesService,
    countriesRouter,
};