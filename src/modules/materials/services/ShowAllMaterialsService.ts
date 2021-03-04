import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

@injectable()
export default class ShowAllMaterialsService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(): Promise<MaterialEntity[]> {
    const allMaterials = await this.materialsRepository.showAllMaterials();

    return allMaterials;
  }
}
