const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new ApiError('No token provided', 401);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError('Invalid token', 401);
    }
};


const authorize = (requiredPermission) => (req, res, next) => {
    if (!req.user.permissions.includes(requiredPermission)) {
        throw new Error('Insufficient permissions');
    }
    next();
};

module.exports = { authenticate, authorize };