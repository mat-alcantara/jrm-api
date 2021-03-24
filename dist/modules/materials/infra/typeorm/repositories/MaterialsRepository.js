"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MaterialEntity = _interopRequireDefault(require("../entities/MaterialEntity"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MaterialsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_MaterialEntity.default);
  }

  async createMaterial(data) {
    const material = await this.ormRepository.create(data);
    await this.ormRepository.save(material);
    return material;
  }

  async findByNameAndThickness(name, thickness) {
    const doesMaterialExists = await this.ormRepository.findOne({
      where: {
        name,
        thickness
      }
    });
    return !!doesMaterialExists;
  }

  async showAllMaterials() {
    const allMaterials = await this.ormRepository.find();
    return allMaterials;
  }

  async findMaterialById(id) {
    const specificMaterial = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return specificMaterial;
  }

  async removeById(id) {
    await this.ormRepository.delete(id);
  }

  async updateMaterial(materialToUpdate, updateData) {
    const materialUpdatedByTypeORM = await this.ormRepository.save({ ...materialToUpdate,
      ...updateData
    });
    return materialUpdatedByTypeORM;
  }

}

exports.default = MaterialsRepository;