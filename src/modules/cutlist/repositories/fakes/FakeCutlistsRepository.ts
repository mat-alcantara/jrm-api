import OrderEntity from '@modules/cutlist/infra/typeorm/entities/OrderEntity';

import ICutlistsRepository from '@modules/cutlist/repositories/ICutlistsRepository';
import ICreateCutlistDTO from '@modules/cutlist/dtos/ICreateCutlistDTO';

import { v4 as uuid_v4 } from 'uuid';

export default class FakeCutlistsRepository implements ICutlistsRepository {
  private cutlistsCreated: OrderEntity[];

  constructor() {
    this.cutlistsCreated = [];
  }

  // Create a new cutlist
  public async createCutlist(
    cutlistData: ICreateCutlistDTO,
  ): Promise<OrderEntity> {
    const cutlist = new OrderEntity();

    Object.assign(cutlist, { id: uuid_v4() }, cutlistData);

    this.cutlistsCreated.push(cutlist);

    return cutlist;
  }

  public async showAllCutlists(): Promise<OrderEntity[]> {
    return this.cutlistsCreated;
  }

  public async findCutlistById(id: string): Promise<OrderEntity | undefined> {
    return this.cutlistsCreated.find(cutlist => cutlist.id === id);
  }

  public async deleteCutlist(cutlist: OrderEntity): Promise<void> {
    await this.cutlistsCreated.splice(this.cutlistsCreated.indexOf(cutlist), 1);
  }
}
