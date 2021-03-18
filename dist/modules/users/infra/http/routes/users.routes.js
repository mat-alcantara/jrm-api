"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _celebrate = require("celebrate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
const userController = new _UserController.default();
routes.post('/users', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().required(),
    password: _celebrate.Joi.string().required(),
    userType: _celebrate.Joi.string().valid('sell', 'production')
  })
}), userController.create);
var _default = routes;
exports.default = _default;