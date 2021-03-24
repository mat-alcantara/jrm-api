"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _OrderEntity = _interopRequireDefault(require("../entities/OrderEntity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrdersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_OrderEntity.default);
  }

  async createOrder(orderData) {
    const orderCreated = await this.ormRepository.create(orderData);
    await this.ormRepository.save(orderCreated);
    return orderCreated;
  }

  async showAllOrders() {
    const allOrders = await this.ormRepository.find();
    return allOrders;
  }

  async findOrderById(id) {
    const specificOrder = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return specificOrder;
  }

  async deleteOrder(order) {
    await this.ormRepository.delete(order.id);
  }

  async deleteCutlist(order, cutlistId) {
    const orderWithoutCutlist = order.cutlist.filter(currentOrder => currentOrder.id !== cutlistId);
    const newOrder = order;
    newOrder.cutlist = orderWithoutCutlist;
    await this.ormRepository.save({ ...order,
      ...newOrder
    }); // Update a cutlist
  }

  async updateCutlist(order, cutlistId, cutlistData) {
    const orderToUpdate = order;
    const cutlistToUpdate = order.cutlist.find(currentCutlist => currentCutlist.id === cutlistId);

    if (cutlistToUpdate) {
      const cutlistUpdated = { ...cutlistToUpdate,
        ...cutlistData
      };
      orderToUpdate.cutlist[orderToUpdate.cutlist.indexOf(cutlistToUpdate)] = cutlistUpdated;
      await this.ormRepository.save(orderToUpdate);
    }

    return orderToUpdate;
  }

  async createCutlist(order, cutlist) {
    order.cutlist.push(cutlist);
    await this.ormRepository.save(order);
    return order;
  }

}

exports.default = OrdersRepository;