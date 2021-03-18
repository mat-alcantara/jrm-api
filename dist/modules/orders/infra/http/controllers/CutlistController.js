"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _DeleteCutlistService = _interopRequireDefault(require("../../../services/DeleteCutlistService"));

var _UpdateCutlistService = _interopRequireDefault(require("../../../services/UpdateCutlistService"));

var _CreateCutlistService = _interopRequireDefault(require("../../../services/CreateCutlistService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CutlistController {
  async create(request, response) {
    const {
      id
    } = request.params;
    const cutlistData = request.body;
    const createCutlistService = await _tsyringe.container.resolve(_CreateCutlistService.default);
    const orderUpdated = await createCutlistService.execute(id, cutlistData);
    return response.json(orderUpdated);
  }

  async remove(request, response) {
    const {
      id
    } = request.params;
    const {
      cutlistId
    } = request.body;
    const deleteCutlistService = await _tsyringe.container.resolve(_DeleteCutlistService.default);
    await deleteCutlistService.execute(id, cutlistId);
    return response.json();
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      cutlistId,
      cutlistData
    } = request.body;
    const updateCutlistService = await _tsyringe.container.resolve(_UpdateCutlistService.default);
    const orderWithCutlistUpdated = await updateCutlistService.execute(id, cutlistId, cutlistData);
    return response.json(orderWithCutlistUpdated);
  }

}

exports.default = CutlistController;