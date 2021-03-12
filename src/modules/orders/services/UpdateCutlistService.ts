import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IUpdateCutlistDTO from '@modules/orders/dtos/IUpdateCutlistDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateCutlistService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(
    id: string,
    cutlistId: string,
    cutlistData: IUpdateCutlistDTO,
  ): Promise<OrderEntity> {
    const orderToUpdateCutlist = await this.ordersRepository.findOrderById(id);

    if (!orderToUpdateCutlist) {
      throw new AppError('Order does not exist', 404);
    }

    const cutlistUpdated = await this.ordersRepository.updateCutlist(
      orderToUpdateCutlist,
      cutlistId,
      cutlistData,
    );

    return cutlistUpdated;
  }
}