import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICutlistRepository from '@modules/cutlist/repositories/ICutlistsRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteCutlistService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: ICutlistRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cutlistToRemove = await this.cutlistsRepository.findCutlistById(id);

    if (!cutlistToRemove) {
      throw new AppError('Cutlist does not exist', 404);
    }

    await this.cutlistsRepository.deleteCutlist(cutlistToRemove);
  }
}
