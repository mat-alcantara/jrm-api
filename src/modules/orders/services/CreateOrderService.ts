/* eslint-disable no-param-reassign */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider';

import AppError from '@shared/errors/AppError';

import { v4 } from 'uuid';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
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

    // Check if material exist and add id to every json file
    for (let i = 0; i < orderData.cutlist.length; i += 1) {
      orderData.cutlist.forEach(async cutlist => {
        const doesMaterialExist = await this.materialsRepository.findMaterialById(
          cutlist.material_id,
        );

        if (!doesMaterialExist) {
          throw new AppError('There is a invalid material on the order', 404);
        }
      });

      const orderId = v4();
      orderData.cutlist[i].id = orderId;
    }

    // Add
    orderData.deliveryDate = this.dateProvider.defaultDate7Days();

    // Create a new cutlist
    const orderCreated = await this.ordersRepository.createOrder(orderData);

    return orderCreated;
  }
}
