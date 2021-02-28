import { inject, injectable } from 'tsyringe';

import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';

import IMaterialsRepository from '@modules/cutlist/repositories/IMaterialsRepository';
import ICreateMaterialDTO from '../dtos/ICreateMaterialDTO';

@injectable()
export default class CreateMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(data: ICreateMaterialDTO): Promise<MaterialEntity> {
    const materialCreated = await this.materialsRepository.create(data);

    return materialCreated;
  }
}
