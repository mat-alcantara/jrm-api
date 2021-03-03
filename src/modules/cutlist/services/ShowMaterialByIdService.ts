import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';

import AppError from '@shared/errors/AppError';

import IMaterialsRepository from '@modules/cutlist/repositories/IMaterialsRepository';

@injectable()
export default class ShowMaterialById {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(id: string): Promise<MaterialEntity> {
    const specificMaterial = await this.materialsRepository.showMaterialById(
      id,
    );

    if (!specificMaterial) {
      throw new AppError('Material does not exist', 404);
    }

    return specificMaterial;
  }
}
