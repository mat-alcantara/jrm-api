"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _dec, _class;

let ShowAllMaterialsService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ShowAllMaterialsService {
  constructor(materialsRepository) {
    this.materialsRepository = materialsRepository;
  }

  async execute() {
    const allMaterials = await this.materialsRepository.showAllMaterials();
    return allMaterials;
  }

}) || _class);
exports.default = ShowAllMaterialsService;