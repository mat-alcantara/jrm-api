"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MaterialEntity = _interopRequireDefault(require("../../infra/typeorm/entities/MaterialEntity"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeMaterialsRepository {
  constructor() {
    this.materialsCreated = [];
  } // Create a new material


  async createMaterial(materialData) {
    const material = new _MaterialEntity.default();
    Object.assign(material, {
      id: (0, _uuid.v4)()
    }, materialData);
    this.materialsCreated.push(material);
    return material;
  } // Find a material by name and thickness and return if it exists


  async findByNameAndThickness(name, thickness) {
    const doesMaterialExists = this.materialsCreated.find(material => material.name === name && material.thickness === thickness);
    return !!doesMaterialExists; // Return the response as a boolean
  }

  async showAllMaterials() {
    return this.materialsCreated;
  }

  async findMaterialById(id) {
    const specificMaterial = await this.materialsCreated.find(material => material.id === id);
    return specificMaterial;
  }

  async removeById(id) {
    const itemToRemove = await this.materialsCreated.find(material => material.id === id);

    if (itemToRemove) {
      this.materialsCreated.splice(this.materialsCreated.indexOf(itemToRemove), 1);
    }
  }

  async updateMaterial(materialToUpdate, updateData) {
    // Create a updated material
    const materialUpdated = { ...materialToUpdate,
      ...updateData
    }; // Remove old material

    this.materialsCreated.splice(this.materialsCreated.indexOf(materialToUpdate)); // Add new material

    this.materialsCreated.push(materialUpdated);
    return materialUpdated;
  }

}

exports.default = FakeMaterialsRepository;