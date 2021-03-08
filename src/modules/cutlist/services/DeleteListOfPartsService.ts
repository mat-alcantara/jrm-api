import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICutlistRepository from '@modules/cutlist/repositories/ICutlistsRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteListOfPartsService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: ICutlistRepository,
  ) {}

  public async execute(id: string, partId: string): Promise<void> {
    const cutlistToRemovePart = await this.cutlistsRepository.findCutlistById(
      id,
    );

    if (!cutlistToRemovePart) {
      throw new AppError('Cutlist does not exist', 404);
    }

    const doesCutlistPartExist = await this.cutlistsRepository.findCutlistById(
      partId,
    );

    if (!doesCutlistPartExist) {
      throw new AppError('Cutlist part does not exist', 404);
    }

    await this.cutlistsRepository.deletePart(id, partId);
  }
}
