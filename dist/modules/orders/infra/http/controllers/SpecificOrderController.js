"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowSpecificOrderService = _interopRequireDefault(require("../../../services/ShowSpecificOrderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SpecificCutlistController {
  async show(request, response) {
    const {
      id
    } = request.params;
    const showSpecificOrderService = await _tsyringe.container.resolve(_ShowSpecificOrderService.default);
    const specificOrder = await showSpecificOrderService.execute(id);
    return response.json(specificOrder);
  }

}

exports.default = SpecificCutlistController;