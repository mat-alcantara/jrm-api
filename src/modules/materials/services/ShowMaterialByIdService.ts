import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';

import AppError from '@shared/errors/AppError';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

@injectable()
export default class ShowMaterialById {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(id: string): Promise<MaterialEntity> {
    const specificMaterial = await this.materialsRepository.findMaterialById(
      id,
    );

    if (!specificMaterial) {
      throw new AppError('Material does not exist', 404);
    }

    return specificMaterial;
  }
}
