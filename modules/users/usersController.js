const asyncHandler = require("../../utils/asyncHandler");
const { uploadUserProfileImage } = require('../../middlewares/multer');
const UsersService = require('./usersService');

exports.getAllUsers = asyncHandler(async (req, res) => {
    const response = await UsersService.getAllUsers();
    res.status(response.code).json(response);
});

exports.getUserById = asyncHandler(async (req, res) => {
    const response = await UsersService.getUserById(req.params.id);
    res.status(response.code).json(response);
});

exports.createUser = asyncHandler(async (req, res) => {
    uploadUserProfileImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        try {
            const response = await UsersService.createUser(req.body, req.file);
            res.status(response.code).json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: 'error',
                code: error.statusCode || 500,
                message: error.message,
            });
        }
    });
});

exports.updateUser = asyncHandler(async (req, res) => {
    uploadUserProfileImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: err.message || 'File upload error',
            });
        }
        try {
            const response = await UsersService.updateUser(req.params.id, req.body, req.file);
            res.status(response.code).json(response);
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: 'error',
                code: error.statusCode || 500,
                message: error.message,
            });
        }
    });
});

exports.loginUser = asyncHandler(async (req, res) => {
    const response = await UsersService.loginUser(req.body);
    res.status(response.code).json(response);
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const response = await UsersService.deleteUser(req.params.id);
    res.status(response.code).json(response);
});


exports.resetUserPassword = asyncHandler(async (req, res) => {
    const response = await UsersService.resetUserPassword(req.params.id, req.body.newPassword);
    res.status(response.code).json(response);
});

exports.searchUserByUsername = asyncHandler(async (req, res) => {
    const response = await UsersService.searchUserByUsername(req.query.username);
    res.status(response.code).json(response);
});

exports.activateDeactivateUser = asyncHandler(async (req, res) => {
    const response = await UsersService.activateDeactivateUser(req.params.id, req.body.isActive);
    res.status(response.code).json(response);
});