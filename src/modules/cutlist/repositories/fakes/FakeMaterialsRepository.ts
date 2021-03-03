import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';

import IMaterialsRepository from '@modules/cutlist/repositories/IMaterialsRepository';
import ICreateMaterialDTO from '@modules/cutlist/dtos/ICreateMaterialDTO';

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
  public async findByNameAndThickness(
    name: string,
    thickness: number,
  ): Promise<boolean> {
    const doesMaterialExists = this.materialsCreated.find(
      material => material.name === name && material.thickness === thickness,
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
}
