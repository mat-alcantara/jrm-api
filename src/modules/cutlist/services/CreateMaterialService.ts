import { inject, injectable } from 'tsyringe';

import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';

import IMaterialsRepository from '@modules/cutlist/repositories/IMaterialsRepository';
import ICreateMaterialDTO from '@modules/cutlist/dtos/ICreateMaterialDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(
    materialData: ICreateMaterialDTO,
  ): Promise<MaterialEntity> {
    const { name, thickness } = materialData;

    const doesMaterialExist = await this.materialsRepository.findByNameAndThickness(
      name,
      thickness,
    );

    if (!doesMaterialExist) {
      throw new AppError('Material already exist', 404);
    }

    const materialCreated = await this.materialsRepository.createMaterial(
      materialData,
    );

    return materialCreated;
  }
}
