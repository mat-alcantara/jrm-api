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

let CreateCustomerSession = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateCustomerSession {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  } // Create a new customer


  async execute(id) {
    const checkIfCustomerExist = await this.customersRepository.findCustomerById(id);

    if (!checkIfCustomerExist) {
      throw new _AppError.default('Customer does not exists', 404);
    }

    await this.customersRepository.deleteCustomerById(id);
  }

}) || _class);
exports.default = CreateCustomerSession;