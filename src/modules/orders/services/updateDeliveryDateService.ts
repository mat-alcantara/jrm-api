// Recebe o id de um pedido
// Recebe uma data de entrega (opcional)
// Muda a data de entrega do pedido

/* eslint-disable no-param-reassign */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider';

import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateDeliveryDateService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute(id: string, deliveryDate?: Date): Promise<OrderEntity> {
    const orderToUpdateDeliveryDate = await this.ordersRepository.findOrderById(
      id,
    );

    if (!orderToUpdateDeliveryDate) {
      throw new AppError('Order does not exist', 404);
    }

    let newDate: string;

    if (deliveryDate) {
      newDate = this.dateProvider.convertDate(deliveryDate);
    } else {
      newDate = this.dateProvider.defaultDate7Days();
    }

    const orderUpdated = await this.ordersRepository.updateOrder(
      orderToUpdateDeliveryDate,
      {
        deliveryDate: newDate,
      },
    );

    return orderUpdated;
  }
}
