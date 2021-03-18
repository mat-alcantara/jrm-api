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
  constructor(ordersRepository, customersRepository, dateProvider) {
    this.ordersRepository = ordersRepository;
    this.customersRepository = customersRepository;
    this.dateProvider = dateProvider;
  }

  async execute(orderData) {
    // Check if customer exist
    const {
      customerId
    } = orderData;
    const doesCustomerExist = await this.customersRepository.findCustomerById(customerId);

    if (!doesCustomerExist) {
      throw new _AppError.default('Customer does not exist', 404);
    } // Add id to every json file


    for (let i = 0; i < orderData.cutlist.length; i += 1) {
      const orderId = (0, _uuid.v4)();
      orderData.cutlist[i].id = orderId;
    } // Add


    orderData.deliveryDate = this.dateProvider.defaultDate7Days(); // Create a new cutlist

    const orderCreated = await this.ordersRepository.createOrder(orderData);
    return orderCreated;
  }

}) || _class);
exports.default = CreateOrderService;