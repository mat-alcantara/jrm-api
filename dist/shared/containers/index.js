"use strict";

var _tsyringe = require("tsyringe");

require("./providers/HashProvider");

require("./providers/AuthProvider");

require("./providers/DateProvider");

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _CustomersRepository = _interopRequireDefault(require("../../modules/customers/infra/typeorm/repositories/CustomersRepository"));

var _MaterialsRepository = _interopRequireDefault(require("../../modules/materials/infra/typeorm/repositories/MaterialsRepository"));

var _OrdersRepository = _interopRequireDefault(require("../../modules/orders/infra/typeorm/repositories/OrdersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('CustomersRepository', _CustomersRepository.default);

_tsyringe.container.registerSingleton('MaterialsRepository', _MaterialsRepository.default);

_tsyringe.container.registerSingleton('OrdersRepository', _OrdersRepository.default);