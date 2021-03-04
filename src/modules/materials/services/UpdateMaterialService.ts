import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';

import IMaterialsRepository from '@modules/cutlist/repositories/IMaterialsRepository';
import IUpdateMaterialDTO from '@modules/cutlist/dtos/IUpdateMaterialDTO';

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
