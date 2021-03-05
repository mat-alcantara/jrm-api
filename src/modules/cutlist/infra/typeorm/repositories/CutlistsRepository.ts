import { getRepository, Repository } from 'typeorm';

import CutlistEntity from '@modules/cutlist/infra/typeorm/entities/CutlistEntity';

import ICutlistRepository from '@modules/cutlist/repositories/ICutlistsRepository';
import ICreateCutlistDTO from '@modules/cutlist/dtos/ICreateCutlistDTO';

export default class CutlistsRepository implements ICutlistRepository {
  private ormRepository: Repository<CutlistEntity>;

  constructor() {
    this.ormRepository = getRepository(CutlistEntity);
  }

  public async createCutlist(
    cutlistData: ICreateCutlistDTO,
  ): Promise<CutlistEntity> {
    const cutlistCreated = await this.ormRepository.create(cutlistData);

    await this.ormRepository.save(cutlistCreated);

    return cutlistCreated;
  }

  public async showAllCutlists(): Promise<CutlistEntity[]> {
    const allCutlists = await this.ormRepository.find();

    return allCutlists;
  }
}
