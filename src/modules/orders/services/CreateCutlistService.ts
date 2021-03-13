/* eslint-disable no-param-reassign */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import ICutlistDTO from '@modules/orders/dtos/ICutlistDTO';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import AppError from '@shared/errors/AppError';

import { v4 } from 'uuid';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(
    id: string,
    cutlistData: ICutlistDTO,
  ): Promise<OrderEntity> {
    console.log(cutlistData);

    // Add id to cutlist
    cutlistData.id = v4();

    // Find the order to add Cutlist
    const orderToCreateCutlist = await this.ordersRepository.findOrderById(id);

    if (!orderToCreateCutlist) {
      throw new AppError('Order does not exist', 404);
    }

    // Create a new cutlist
    const orderWithCutlistCreated = await this.ordersRepository.createCutlist(
      orderToCreateCutlist,
      cutlistData,
    );

    return orderWithCutlistCreated;
  }
}
