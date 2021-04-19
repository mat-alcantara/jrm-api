"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IMaterialsRepository = _interopRequireDefault(require("../repositories/IMaterialsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateMaterialService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MaterialsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMaterialsRepository.default === "undefined" ? Object : _IMaterialsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateMaterialService {
  constructor(materialsRepository) {
    this.materialsRepository = materialsRepository;
  }

  async execute(id, updateData) {
    const materialToUpdate = await this.materialsRepository.findMaterialById(id);

    if (!materialToUpdate) {
      throw new _AppError.default('Material does not exist', 404);
    }

    const updatedMaterial = await this.materialsRepository.updateMaterial(materialToUpdate, updateData);
    return updatedMaterial;
  }

}) || _class) || _class) || _class) || _class);
exports.default = UpdateMaterialService;