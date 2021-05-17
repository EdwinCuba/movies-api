const boom = require('@hapi/boom');
const { config } = require('../../config');

const withErrorStack = (error, stack) => {
  if (config.dev) {
    return {
      ...error,
      stack
    }
  }

  return error;
}

const logErrors = (error, req, res, next) => {
  console.log(error);
  next(error);
}

const wrapErrors = (error, req, res, next) => {
  if (!error.isBoom) {
    return next(boom.badImplementation(error));
  }

  return next(error);
}

const errorHandler = (error, req, res, next) => { //eslint-disable-line
  const { output: { statusCode, payload } } = error;

  res.status(statusCode);
  res.json(withErrorStack(payload, error.stack));
}

module.exports = {
  wrapErrors,
  logErrors,
  errorHandler
}