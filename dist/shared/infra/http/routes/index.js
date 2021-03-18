"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _auth = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/auth.routes"));

var _customers = _interopRequireDefault(require("../../../../modules/customers/infra/http/routes/customers.routes"));

var _materials = _interopRequireDefault(require("../../../../modules/materials/infra/http/routes/materials.routes"));

var _orders = _interopRequireDefault(require("../../../../modules/orders/infra/http/routes/orders.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/', _users.default);
router.use('/', _auth.default);
router.use('/', _customers.default);
router.use('/', _materials.default);
router.use('/', _orders.default);
var _default = router;
exports.default = _default;