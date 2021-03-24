"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _OrderEntity = _interopRequireDefault(require("../../infra/typeorm/entities/OrderEntity"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeOrdersRepository {
  constructor() {
    this.ordersCreated = void 0;
    this.ordersCreated = [];
  } // Create a new cutlist


  async createOrder(orderData) {
    const order = new _OrderEntity.default();
    Object.assign(order, {
      id: (0, _uuid.v4)()
    }, orderData);
    this.ordersCreated.push(order);
    return order;
  }

  async showAllOrders() {
    return this.ordersCreated;
  }

  async findOrderById(id) {
    return this.ordersCreated.find(order => order.id === id);
  }

  async deleteOrder(order) {
    await this.ordersCreated.splice(this.ordersCreated.indexOf(order), 1);
  }

  async deleteCutlist(order, cutlistId) {
    const cutlistWithoutDeletedCutlist = order.cutlist.filter(cutlist => cutlist.id !== cutlistId);
    this.ordersCreated.splice(this.ordersCreated.indexOf(order), 1); // eslint-disable-next-line no-param-reassign

    order.cutlist = cutlistWithoutDeletedCutlist;
    this.ordersCreated.push(order);
  }

  async updateCutlist(order, cutlistId, cutlistData) {
    const cutlistToChange = order.cutlist.find(currentCutlist => currentCutlist.id === cutlistId);

    if (cutlistToChange) {
      this.ordersCreated.splice(this.ordersCreated.indexOf(order), 1);
      const changedCutlist = { ...cutlistToChange,
        ...cutlistData
      }; // eslint-disable-next-line no-param-reassign

      order.cutlist[order.cutlist.indexOf(cutlistToChange)] = changedCutlist;
      this.ordersCreated.push(order);
    }

    return order;
  }

  async createCutlist(order, cutlist) {
    this.ordersCreated.splice(this.ordersCreated.indexOf(order), 1);
    order.cutlist.push(cutlist);
    this.ordersCreated.push(order);
    return order;
  }

}

exports.default = FakeOrdersRepository;