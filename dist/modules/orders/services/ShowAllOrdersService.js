"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ShowAllOrdersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowAllOrdersService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute() {
    const allOrders = this.ordersRepository.showAllOrders();
    return allOrders;
  }

}) || _class) || _class) || _class) || _class);
exports.default = ShowAllOrdersService;