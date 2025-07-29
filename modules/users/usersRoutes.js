
const express = require('express');
const router = express.Router();
const usersController = require('./usersController');
const { authenticate, authorize } = require('../../middlewares/auth');

router.post('/login', usersController.loginUser);
router.get('/get-users', authenticate, authorize('users_read'), usersController.getAllUsers);
router.get('/get-user/:id', authenticate, authorize('users_read'), usersController.getUserById);
router.post('/create-user', authenticate, authorize('users_create'), usersController.createUser);
router.put('/update-user/:id', authenticate, authorize('users_update'), usersController.updateUser);
router.delete('/delete-user/:id', authenticate, authorize('users_delete'), usersController.deleteUser);
router.put('/reset-password/:id', authenticate, authorize('users_reset_password'), usersController.resetUserPassword);
router.get('/search-users', authenticate, authorize('users_search'), usersController.searchUserByUsername);
router.post('/activate-deactivate-user/:id', authenticate, authorize('users_activate_deactivate'), usersController.activateDeactivateUser);

module.exports = router;