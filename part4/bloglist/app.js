const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/Blogs');
const logger = require('./utils/logger');
const usersRouter = require('./controllers/Users');
const loginRouter = require('./controllers/Login');
const middleware = require('./utils/middleware');

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

app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/Testing');
  app.use('/api/testing',testingRouter);
}

app.use(middleware.errorHandler);
module.exports = app;