import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

@injectable()
export default class ShowAllOrdersService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: IOrdersRepository,
  ) {}

  public async execute(): Promise<OrderEntity[]> {
    const allCutlists = this.cutlistsRepository.showAllCutlists();

    return allCutlists;
  }
}
