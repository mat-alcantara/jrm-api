import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowSpecificOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<OrderEntity> {
    const specificOrder = await this.ordersRepository.findOrderById(id);

    if (!specificOrder) {
      throw new AppError('Order does not exist', 404);
    }

    return specificOrder;
  }
}
