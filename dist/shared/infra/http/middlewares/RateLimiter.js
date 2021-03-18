"use strict";

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.set('trust proxy', 1);
const limiter = (0, _expressRateLimit.default)({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs

}); //  apply to all requests

app.use(limiter);