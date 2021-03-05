import CutlistEntity from '@modules/cutlist/infra/typeorm/entities/CutlistEntity';

import ICutlistsRepository from '@modules/cutlist/repositories/ICutlistsRepository';
import ICreateCutlistDTO from '@modules/cutlist/dtos/ICreateCutlistDTO';

import { v4 as uuid_v4 } from 'uuid';

export default class FakeCutlistsRepository implements ICutlistsRepository {
  private cutlistsCreated: CutlistEntity[];

  constructor() {
    this.cutlistsCreated = [];
  }

  // Create a new cutlist
  public async createCutlist(
    cutlistData: ICreateCutlistDTO,
  ): Promise<CutlistEntity> {
    const cutlist = new CutlistEntity();

    Object.assign(cutlist, { id: uuid_v4() }, cutlistData);

    this.cutlistsCreated.push(cutlist);

    return cutlist;
  }

  public async showAllCutlists(): Promise<CutlistEntity[]> {
    return this.cutlistsCreated;
  }

  public async findCutlistById(id: string): Promise<CutlistEntity | undefined> {
    return this.cutlistsCreated.find(cutlist => cutlist.id === id);
  }
}
