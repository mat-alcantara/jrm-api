"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _ICustomersRepository = _interopRequireDefault(require("../../customers/repositories/ICustomersRepository"));

var _IDateProvider = _interopRequireDefault(require("../../../shared/containers/providers/DateProvider/models/IDateProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _uuid = require("uuid");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CustomersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _ICustomersRepository.default === "undefined" ? Object : _ICustomersRepository.default, typeof _IDateProvider.default === "undefined" ? Object : _IDateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateOrderService {
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

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateOrderService;