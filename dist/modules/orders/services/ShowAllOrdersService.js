"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _dec, _class;

let ShowAllOrdersService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ShowAllOrdersService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute() {
    const allOrders = this.ordersRepository.showAllOrders();
    return allOrders;
  }

}) || _class);
exports.default = ShowAllOrdersService;