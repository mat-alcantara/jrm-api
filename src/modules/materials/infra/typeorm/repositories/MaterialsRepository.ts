import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';
import ICreateMaterialDTO from '@modules/materials/dtos/ICreateMaterialDTO';
import IUpdateMaterialDTO from '@modules/materials/dtos/IUpdateMaterialDTO';
import { getRepository, Repository } from 'typeorm';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

export default class MaterialsRepository implements IMaterialsRepository {
  private ormRepository: Repository<MaterialEntity>;

  constructor() {
    this.ormRepository = getRepository(MaterialEntity);
  }

  public async createMaterial(
    data: ICreateMaterialDTO,
  ): Promise<MaterialEntity> {
    const material = await this.ormRepository.create(data);

    await this.ormRepository.save(material);

    return material;
  }

  public async findByName(name: string): Promise<boolean> {
    const doesMaterialExists = await this.ormRepository.findOne({
      where: { name },
    });

    return !!doesMaterialExists;
  }

  public async showAllMaterials(): Promise<MaterialEntity[]> {
    const allMaterials = await this.ormRepository.find();

    return allMaterials;
  }

  public async findMaterialById(
    id: string,
  ): Promise<MaterialEntity | undefined> {
    const specificMaterial = await this.ormRepository.findOne({
      where: { id },
    });

    return specificMaterial;
  }

  public async removeById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async updateMaterial(
    materialToUpdate: MaterialEntity,
    updateData: IUpdateMaterialDTO,
  ): Promise<MaterialEntity> {
    const materialUpdatedByTypeORM = await this.ormRepository.save({
      ...materialToUpdate,
      ...updateData,
    });

    return materialUpdatedByTypeORM;
  }
}
