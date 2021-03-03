import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMaterialsRepository from '@modules/cutlist/repositories/IMaterialsRepository';

@injectable()
export default class DeleteMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const materialToDelete = await this.materialsRepository.findMaterialById(
      id,
    );

    if (!materialToDelete) {
      throw new AppError('Material does not exist', 404);
    }

    await this.materialsRepository.removeById(id);
  }
}
