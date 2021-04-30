import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    try {
      const orderToRemove = await this.ordersRepository.findOrderById(id);

      if (!orderToRemove) {
        throw new AppError('Order does not exist', 404);
      }

      await this.ordersRepository.deleteOrder(orderToRemove);
    } catch {
      throw new AppError('Order does not exist', 404);
    }
  }
}
