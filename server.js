const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');
const allRouter = require('./modules');
const logger = require('./config/logger');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', allRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`);
});