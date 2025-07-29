const logger = require('../config/logger');

const errorHandler = (error, req, res, next) => {
    logger.error('Unhandled error', { 
        error: error.message, 
        stack: error.stack, 
        method: req.method, 
        url: req.url 
    });
    
    const statusCode = error.message.includes('not found') ? 404 : 500;
    
    res.status(statusCode).json({
        success: false,
        error: error.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;