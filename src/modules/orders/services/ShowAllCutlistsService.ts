import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import ICutlistRepository from '@modules/orders/repositories/ICutlistsRepository';

@injectable()
export default class ShowAllCutlistsService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: ICutlistRepository,
  ) {}

  public async execute(): Promise<OrderEntity[]> {
    const allCutlists = this.cutlistsRepository.showAllCutlists();

    return allCutlists;
  }
}
