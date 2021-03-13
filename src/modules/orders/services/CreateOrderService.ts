/* eslint-disable no-param-reassign */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { format, addDays } from 'date-fns';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import AppError from '@shared/errors/AppError';

import { v4 } from 'uuid';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(orderData: ICreateOrderDTO): Promise<OrderEntity> {
    // Check if customer exist
    const { customerId } = orderData;

    const doesCustomerExist = await this.customersRepository.findCustomerById(
      customerId,
    );

    if (!doesCustomerExist) {
      throw new AppError('Customer does not exist', 404);
    }

    // Add id to every json file
    for (let i = 0; i < orderData.cutlist.length; i += 1) {
      const orderId = v4();
      orderData.cutlist[i].id = orderId;
    }

    // Add / Format date
    if (!orderData.deliveryDate) {
      orderData.deliveryDate = format(
        addDays(new Date(Date.now()), 7),
        'dd/MM/yyyy',
      );
    }

    // Create a new cutlist
    const orderCreated = await this.ordersRepository.createOrder(orderData);

    return orderCreated;
  }
}
