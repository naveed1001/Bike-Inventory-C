const usersController = require('./usersController');
const UsersRepository = require('./usersRepository');
const UsersService = require('./usersService');
const usersRouter = require('./usersRoutes');

module.exports = {
    usersController,
    UsersRepository,
    UsersService,
    usersRouter,
};