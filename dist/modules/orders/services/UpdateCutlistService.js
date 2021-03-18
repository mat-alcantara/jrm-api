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

let UpdateCutlistService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class UpdateCutlistService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(id, cutlistId, cutlistData) {
    const orderToUpdateCutlist = await this.ordersRepository.findOrderById(id);

    if (!orderToUpdateCutlist) {
      throw new _AppError.default('Order does not exist', 404);
    }

    const cutlistUpdated = await this.ordersRepository.updateCutlist(orderToUpdateCutlist, cutlistId, cutlistData);
    return cutlistUpdated;
  }

}) || _class);
exports.default = UpdateCutlistService;