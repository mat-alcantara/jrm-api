import { getRepository, Repository } from 'typeorm';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

export default class CutlistsRepository implements IOrdersRepository {
  private ormRepository: Repository<OrderEntity>;

  constructor() {
    this.ormRepository = getRepository(OrderEntity);
  }

  public async createCutlist(
    cutlistData: ICreateOrderDTO,
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
