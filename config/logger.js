const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    // Define the format for the logs
    format: winston.format.combine(
        winston.format.timestamp(), // Add a timestamp to each log
        winston.format.errors({ stack: true }), // Include the full error stack trace if an error is logged
        winston.format.splat(), // Enable string interpolation (e.g., logger.info("User %s logged in", user))
        winston.format.json() // Output logs in JSON format for easy parsing and analysis
    ),
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'logs/app.log'
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

module.exports = logger;