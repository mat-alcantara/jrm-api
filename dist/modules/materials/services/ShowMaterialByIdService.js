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

let ShowMaterialById = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ShowMaterialById {
  constructor(materialsRepository) {
    this.materialsRepository = materialsRepository;
  }

  async execute(id) {
    const specificMaterial = await this.materialsRepository.findMaterialById(id);

    if (!specificMaterial) {
      throw new _AppError.default('Material does not exist', 404);
    }

    return specificMaterial;
  }

}) || _class);
exports.default = ShowMaterialById;