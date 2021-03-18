"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateMaterialService = _interopRequireDefault(require("../../../services/CreateMaterialService"));

var _ShowAllMaterialsService = _interopRequireDefault(require("../../../services/ShowAllMaterialsService"));

var _DeleteMaterialService = _interopRequireDefault(require("../../../services/DeleteMaterialService"));

var _UpdateMaterialService = _interopRequireDefault(require("../../../services/UpdateMaterialService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MaterialController {
  async show(request, response) {
    const showAllMaterialsService = await _tsyringe.container.resolve(_ShowAllMaterialsService.default);
    const allMaterials = await showAllMaterialsService.execute();
    return response.json(allMaterials);
  }

  async create(request, response) {
    const materialData = request.body;
    const createMaterialService = await _tsyringe.container.resolve(_CreateMaterialService.default);
    const materialCreated = await createMaterialService.execute(materialData);
    return response.json(materialCreated);
  }

  async remove(request, response) {
    const {
      id
    } = request.params;

    const deleteMaterialService = _tsyringe.container.resolve(_DeleteMaterialService.default);

    await deleteMaterialService.execute(id);
    return response.json();
  }

  async update(request, response) {
    const updateData = request.body;
    const {
      id
    } = request.params;
    const updateMaterialService = await _tsyringe.container.resolve(_UpdateMaterialService.default);
    const updatedMaterial = await updateMaterialService.execute(id, updateData);
    return response.json(updatedMaterial);
  }

}

exports.default = MaterialController;