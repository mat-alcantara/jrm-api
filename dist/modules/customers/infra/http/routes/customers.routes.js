"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _CustomersController = _interopRequireDefault(require("../controllers/CustomersController"));

var _SpecificCustomerController = _interopRequireDefault(require("../controllers/SpecificCustomerController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const customersRoutes = (0, _express.Router)();
const customersController = new _CustomersController.default();
const specificCustomerController = new _SpecificCustomerController.default();
customersRoutes.use(_ensureAuthenticated.default); // Ensure all routes after this will need authentication

customersRoutes.get('/customers', customersController.show); // Show all customers

customersRoutes.get('/customers/:id', specificCustomerController.show); // Show a specific customer

customersRoutes.post('/customers', // Schema validation for the requisition
(0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string(),
    telephone: _celebrate.Joi.array().items(_celebrate.Joi.string()),
    area: _celebrate.Joi.string().required(),
    city: _celebrate.Joi.string().required(),
    state: _celebrate.Joi.string().required()
  })
}), customersController.create); // Route to create a new customer

customersRoutes.delete('/customers', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
    id: _celebrate.Joi.string().required()
  })
}), customersController.delete); // Route to delete a customer by id

customersRoutes.put('/customers/:id', customersController.update); // Route to update a customer

var _default = customersRoutes;
exports.default = _default;