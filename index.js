const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesAPI = require('./router/movies.js');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middlewares/errorHandlers');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// body parser
app.use(express.json());

moviesAPI(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, () => {
  console.info(`Listening on port number ${config.port}`);
})