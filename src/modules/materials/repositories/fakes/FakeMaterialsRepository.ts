import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import ICreateMaterialDTO from '@modules/materials/dtos/ICreateMaterialDTO';
import IUpdateMaterialDTO from '@modules/materials/dtos/IUpdateMaterialDTO';

import { v4 as uuid_v4 } from 'uuid';

export default class FakeMaterialsRepository implements IMaterialsRepository {
  private materialsCreated: MaterialEntity[];

  constructor() {
    this.materialsCreated = [];
  }

  // Create a new material
  public async createMaterial(
    materialData: ICreateMaterialDTO,
  ): Promise<MaterialEntity> {
    const material = new MaterialEntity();

    Object.assign(material, { id: uuid_v4() }, materialData);

    this.materialsCreated.push(material);

    return material;
  }

  // Find a material by name and thickness and return if it exists
  public async findByName(name: string): Promise<boolean> {
    const doesMaterialExists = this.materialsCreated.find(
      material => material.name === name,
    );

    return !!doesMaterialExists; // Return the response as a boolean
  }

  public async showAllMaterials(): Promise<MaterialEntity[]> {
    return this.materialsCreated;
  }

  public async findMaterialById(
    id: string,
  ): Promise<MaterialEntity | undefined> {
    const specificMaterial = await this.materialsCreated.find(
      material => material.id === id,
    );

    return specificMaterial;
  }

  public async removeById(id: string): Promise<void> {
    const itemToRemove = await this.materialsCreated.find(
      material => material.id === id,
    );

    if (itemToRemove) {
      this.materialsCreated.splice(
        this.materialsCreated.indexOf(itemToRemove),
        1,
      );
    }
  }

  public async updateMaterial(
    materialToUpdate: MaterialEntity,
    updateData: IUpdateMaterialDTO,
  ): Promise<MaterialEntity> {
    // Create a updated material
    const materialUpdated = { ...materialToUpdate, ...updateData };

    // Remove old material
    this.materialsCreated.splice(
      this.materialsCreated.indexOf(materialToUpdate),
    );

    // Add new material
    this.materialsCreated.push(materialUpdated);

    return materialUpdated;
  }
}
