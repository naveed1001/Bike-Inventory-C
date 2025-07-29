const statusController = require('./statusController');
const StatusRepository = require('./statusRepository');
const StatusService = require('./statusService');
const statusRouter = require('./statusRoutes');

module.exports = {
    statusController,
    StatusRepository,
    StatusService,
    statusRouter,
};