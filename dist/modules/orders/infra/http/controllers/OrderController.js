"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateOrderService = _interopRequireDefault(require("../../../services/CreateOrderService"));

var _ShowAllOrdersService = _interopRequireDefault(require("../../../services/ShowAllOrdersService"));

var _DeleteOrderService = _interopRequireDefault(require("../../../services/DeleteOrderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrderController {
  async create(request, response) {
    const ordersData = request.body;
    const createOrderService = await _tsyringe.container.resolve(_CreateOrderService.default);
    const orderCreated = await createOrderService.execute(ordersData);
    return response.json(orderCreated);
  }

  async show(request, response) {
    const showAllOrdersService = await _tsyringe.container.resolve(_ShowAllOrdersService.default);
    const allOrders = await showAllOrdersService.execute();
    return response.json(allOrders);
  }

  async remove(request, response) {
    const {
      id
    } = request.params;
    const deleteOrderService = await _tsyringe.container.resolve(_DeleteOrderService.default);
    await deleteOrderService.execute(id);
    return response.json();
  }

}

exports.default = OrderController;