"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _dec, _class;

let ShowAllCustomersService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ShowAllCustomersService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async execute() {
    const allCustomers = await this.customersRepository.showAllCustomers();
    return allCustomers;
  }

}) || _class);
exports.default = ShowAllCustomersService;