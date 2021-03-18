"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowMaterialByIdService = _interopRequireDefault(require("../../../services/ShowMaterialByIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SpecificMaterialController {
  async show(request, response) {
    const {
      id
    } = request.params;
    const showMaterialById = await _tsyringe.container.resolve(_ShowMaterialByIdService.default);
    const specificMaterial = await showMaterialById.execute(id);
    return response.json(specificMaterial);
  }

}

exports.default = SpecificMaterialController;