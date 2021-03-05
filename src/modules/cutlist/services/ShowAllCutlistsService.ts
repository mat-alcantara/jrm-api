import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import CutlistEntity from '@modules/cutlist/infra/typeorm/entities/CutlistEntity';

import ICutlistRepository from '@modules/cutlist/repositories/ICutlistsRepository';

@injectable()
export default class CreateMaterialService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: ICutlistRepository,
  ) {}

  public async execute(): Promise<CutlistEntity[]> {
    const allCutlists = this.cutlistsRepository.showAllCutlists();

    return allCutlists;
  }
}
