"use strict";

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

require("dotenv/config");

var _celebrate = require("celebrate");

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _routes = _interopRequireDefault(require("./routes"));

require("../typeorm");

require("../../containers");

require("./middlewares/RateLimiter");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
// Dependency needed to catch erros in the application
// Import Error instance
// Import all routes
// Import database
// Import dependency injection Containers
Sentry.init({
  dsn: 'https://cde455106fad4b979714f3dc28915142@o337250.ingest.sentry.io/5674274',
  tracesSampleRate: 1.0
});
const server = (0, _express.default)();
server.use(Sentry.Handlers.requestHandler());
server.use((0, _cors.default)());
server.use((0, _helmet.default)());
server.use(_express.default.json()); // Allow JSON on express

server.use(_routes.default); // Activate routes on express

server.use(Sentry.Handlers.errorHandler());
server.use((0, _celebrate.errors)()); // Celebrate Errors
// Return an error as a instance of AppError

server.use((err, req, res, _) => {
  if (err instanceof _AppError.default) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});
server.listen(process.env.PORT, () => console.log('⚡️ Server started on port 3333!')); // Server will be listened on port 333