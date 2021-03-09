import { getRepository, Repository } from 'typeorm';

import OrderEntity from '@modules/cutlist/infra/typeorm/entities/OrderEntity';

import ICutlistRepository from '@modules/cutlist/repositories/ICutlistsRepository';
import ICreateCutlistDTO from '@modules/cutlist/dtos/ICreateCutlistDTO';

export default class CutlistsRepository implements ICutlistRepository {
  private ormRepository: Repository<OrderEntity>;

  constructor() {
    this.ormRepository = getRepository(OrderEntity);
  }

  public async createCutlist(
    cutlistData: ICreateCutlistDTO,
  ): Promise<OrderEntity> {
    const cutlistCreated = await this.ormRepository.create(cutlistData);

    await this.ormRepository.save(cutlistCreated);

    return cutlistCreated;
  }

  public async showAllCutlists(): Promise<OrderEntity[]> {
    const allCutlists = await this.ormRepository.find();

    return allCutlists;
  }

  public async findCutlistById(id: string): Promise<OrderEntity | undefined> {
    const specificCutlist = await this.ormRepository.findOne({ where: { id } });

    return specificCutlist;
  }

  public async deleteCutlist(cutlist: OrderEntity): Promise<void> {
    await this.ormRepository.delete(cutlist.id);
  }
}
