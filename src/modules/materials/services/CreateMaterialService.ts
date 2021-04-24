import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import ICreateMaterialDTO from '@modules/materials/dtos/ICreateMaterialDTO';

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
    const { name } = materialData;

    const doesMaterialExist = await this.materialsRepository.findByName(name);

    if (doesMaterialExist) {
      throw new AppError('Material already exist', 404);
    }

    const materialCreated = await this.materialsRepository.createMaterial(
      materialData,
    );

    return materialCreated;
  }
}
