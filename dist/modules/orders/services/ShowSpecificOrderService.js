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

let ShowSpecificOrderService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ShowSpecificOrderService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(id) {
    const specificOrder = await this.ordersRepository.findOrderById(id);

    if (!specificOrder) {
      throw new _AppError.default('Order does not exist', 404);
    }

    return specificOrder;
  }

}) || _class);
exports.default = ShowSpecificOrderService;