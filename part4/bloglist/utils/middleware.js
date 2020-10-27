const logger = require('./logger');
const errorHandler = (error, request, response, next) => {
  logger.info(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};
module.exports = {
  errorHandler
};