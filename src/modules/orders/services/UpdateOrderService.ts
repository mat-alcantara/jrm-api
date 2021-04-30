import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IUpdateOrderDTO from '@modules/orders/dtos/IUpdateOrderDTO';
import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(
    orderId: string,
    dataToUpdateOrder: IUpdateOrderDTO,
  ): Promise<OrderEntity> {
    const orderToUpdated = await this.ordersRepository.findOrderById(orderId);

    if (!orderToUpdated) {
      throw new AppError('Order does not exist', 404);
    }

    const orderUpdated = await this.ordersRepository.updateOrder(
      orderToUpdated,
      dataToUpdateOrder,
    );

    return orderUpdated;
  }
}
