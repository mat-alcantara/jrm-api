"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICustomersRepository = _interopRequireDefault(require("../repositories/ICustomersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CustomersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICustomersRepository.default === "undefined" ? Object : _ICustomersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateCustomerService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async execute(id, data) {
    // Find customer
    const customer = await this.customersRepository.findCustomerById(id);

    if (!customer) {
      throw new _AppError.default('Customer does not exist', 404);
    }

    const customerUpdated = this.customersRepository.updateCustomer(customer, data);
    return customerUpdated;
  }

}) || _class) || _class) || _class) || _class);
exports.default = UpdateCustomerService;