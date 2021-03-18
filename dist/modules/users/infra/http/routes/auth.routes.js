"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AuthController = _interopRequireDefault(require("../controllers/AuthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authController = new _AuthController.default();
const routes = (0, _express.Router)(); // Create a new session

routes.post('/session', authController.create);
var _default = routes;
exports.default = _default;