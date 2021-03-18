"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class UpdateCustomerService {
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

}) || _class);
exports.default = UpdateCustomerService;