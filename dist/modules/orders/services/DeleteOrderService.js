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

let DeleteOrderService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class DeleteOrderService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(id) {
    const orderToRemove = await this.ordersRepository.findOrderById(id);

    if (!orderToRemove) {
      throw new _AppError.default('Order does not exist', 404);
    }

    await this.ordersRepository.deleteOrder(orderToRemove);
  }

}) || _class);
exports.default = DeleteOrderService;