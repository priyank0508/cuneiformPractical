require('dotenv').config();

const response = require('./src/utils/response');
const message = require('./src/utils/message');
const { catchErrorHandler } = require('./src/utils/errorHandler');

// Global variables :
global.catchErrorHandler = catchErrorHandler;
global.message = message;
global.statusCode = require('http-status');
global.errorResponse = response.errorResponse;
global.successResponse = response.successResponse;

require('./src/config/db.connection');
const express = require('express');
const cors = require('cors');
const errorHandler = require('errorhandler');
const app = express();
const routes = require('./src/routes/index');
const helmet = require('helmet');

// Middleware Connections :
app.use(cors());
app.options('*', cors());
app.use(helmet());

// parse urlencoded request body :
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes :
app.use('/api', routes);

app.all('/api', (req, res) => {
  return res.send({ code: statusCode.BAD_REQUEST, message: message.commonMsg.apiReqNotFound });
});
app.all('/api/*', (req, res) => {
  return res.send({ statusCode: statusCode.BAD_REQUEST, message: message.commonMsg.apiReqNotFound });
});
app.all('/*', (req, res) => {
  return res.send({ statusCode: statusCode.BAD_REQUEST, message: message.commonMsg.apiReqNotFound });
});

app.use(errorHandler()); // Error Handler

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, function (err) {
  if (err) console.log('Error in server setup');
  console.log(`App listening on the port ${process.env.PORT}`)
});