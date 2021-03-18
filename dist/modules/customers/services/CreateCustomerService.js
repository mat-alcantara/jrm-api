"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _dec, _class;

let CreateCustomerSession = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateCustomerSession {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  } // Create a new customer


  async execute(data) {
    const {
      name,
      email,
      telephone,
      area,
      city,
      state
    } = data;
    const customer = await this.customersRepository.createCustomer({
      name,
      email,
      telephone,
      area,
      city,
      state
    });
    return customer;
  }

}) || _class);
exports.default = CreateCustomerSession;