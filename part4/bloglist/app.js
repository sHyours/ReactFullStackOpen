const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const logger = require('./utils/logger');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(
  () => {
    logger.info('connected to MongoDB');
  }
).catch(
  (error) => {
    logger.error('error connecting to MongoDB', error.message);
  }
);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

app.use(require('./utils/middleware').errorHandler);
module.exports = app;