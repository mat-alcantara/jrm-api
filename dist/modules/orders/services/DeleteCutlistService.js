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

let DeleteCutlistervice = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class DeleteCutlistervice {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(id, cutlistId) {
    const orderToRemoveCutlist = await this.ordersRepository.findOrderById(id);

    if (!orderToRemoveCutlist) {
      throw new _AppError.default('Order does not exist', 404);
    }

    await this.ordersRepository.deleteCutlist(orderToRemoveCutlist, cutlistId);
  }

}) || _class);
exports.default = DeleteCutlistervice;