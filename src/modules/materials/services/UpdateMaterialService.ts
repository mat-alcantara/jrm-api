import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import IUpdateMaterialDTO from '@modules/materials/dtos/IUpdateMaterialDTO';

@injectable()
export default class UpdateMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(
    id: string,
    updateData: IUpdateMaterialDTO,
  ): Promise<MaterialEntity> {
    const materialToUpdate = await this.materialsRepository.findMaterialById(
      id,
    );

    if (!materialToUpdate) {
      throw new AppError('Material does not exist', 404);
    }

    const updatedMaterial = await this.materialsRepository.updateMaterial(
      materialToUpdate,
      updateData,
    );

    return updatedMaterial;
  }
}
