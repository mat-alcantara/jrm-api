import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteCutlistervice {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string, cutlistId: string): Promise<void> {
    const orderToRemoveCutlist = await this.ordersRepository.findOrderById(id);

    if (!orderToRemoveCutlist) {
      throw new AppError('Order does not exist', 404);
    }

    const cutlistToRemove = orderToRemoveCutlist.cutlist.find(
      cutlist => cutlist.id === cutlistId,
    );

    if (!cutlistToRemove) {
      throw new AppError('Cutlist does not exist', 404);
    }

    await this.ordersRepository.deleteCutlist(orderToRemoveCutlist, cutlistId);

    await this.ordersRepository.updateOrder(orderToRemoveCutlist, {
      price: orderToRemoveCutlist.price - cutlistToRemove.price,
    });
  }
}
