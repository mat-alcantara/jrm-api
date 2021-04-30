import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IUpdateOrderDTO from '@modules/orders/dtos/IUpdateOrderDTO';
import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

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
    const orderToUpdate = await this.ordersRepository.findOrderById(orderId);
  }
}
