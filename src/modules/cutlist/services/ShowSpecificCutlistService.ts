import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import CutlistEntity from '@modules/cutlist/infra/typeorm/entities/CutlistEntity';

import ICutlistRepository from '@modules/cutlist/repositories/ICutlistsRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowSpecificCutlistService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: ICutlistRepository,
  ) {}

  public async execute(id: string): Promise<CutlistEntity> {
    const specificCutlist = await this.cutlistsRepository.findCutlistById(id);

    if (!specificCutlist) {
      throw new AppError('Cutlist does not exist', 404);
    }

    return specificCutlist;
  }
}
