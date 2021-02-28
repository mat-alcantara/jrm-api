import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';
import ICreateMaterialDTO from '@modules/cutlist/dtos/ICreateMaterialDTO';
import { getRepository, Repository } from 'typeorm';
import IMaterialsRepository from '@modules/cutlist/repositories/IMaterialsRepository';

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

  public async findByNameAndThickness(
    name: string,
    thickness: number,
  ): Promise<boolean> {
    const doesMaterialExists = await this.ormRepository.findOne({
      where: { name, thickness },
    });

    return !!doesMaterialExists;
  }
}
