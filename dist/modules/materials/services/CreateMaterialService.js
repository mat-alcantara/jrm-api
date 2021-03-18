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

let CreateMaterialService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateMaterialService {
  constructor(materialsRepository) {
    this.materialsRepository = materialsRepository;
  }

  async execute(materialData) {
    const {
      name,
      thickness
    } = materialData;
    const doesMaterialExist = await this.materialsRepository.findByNameAndThickness(name, thickness);

    if (doesMaterialExist) {
      throw new _AppError.default('Material already exist', 404);
    }

    const materialCreated = await this.materialsRepository.createMaterial(materialData);
    return materialCreated;
  }

}) || _class);
exports.default = CreateMaterialService;