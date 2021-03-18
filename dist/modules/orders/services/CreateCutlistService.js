"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _uuid = require("uuid");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateOrderService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateOrderService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(id, cutlistData) {
    // Add id to cutlist
    cutlistData.id = (0, _uuid.v4)(); // Find the order to add Cutlist

    const orderToCreateCutlist = await this.ordersRepository.findOrderById(id);

    if (!orderToCreateCutlist) {
      throw new _AppError.default('Order does not exist', 404);
    } // Create a new cutlist


    const orderWithCutlistCreated = await this.ordersRepository.createCutlist(orderToCreateCutlist, cutlistData);
    return orderWithCutlistCreated;
  }

}) || _class);
exports.default = CreateOrderService;