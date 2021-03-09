/* eslint-disable no-param-reassign */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import ICutlistRepository from '@modules/orders/repositories/ICutlistsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import AppError from '@shared/errors/AppError';

import { v4 } from 'uuid';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: ICutlistRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(cutlistData: ICreateOrderDTO): Promise<OrderEntity> {
    // Check if customer exist
    const { customerId } = cutlistData;

    const doesCustomerExist = await this.customersRepository.findCustomerById(
      customerId,
    );

    if (!doesCustomerExist) {
      throw new AppError('Customer does not exist', 404);
    }

    // Add id to every json file
    for (let i = 0; i < cutlistData.cutlist.length; i += 1) {
      const cutlistId = v4();
      cutlistData.cutlist[i].id = cutlistId;
    }

    // Create a new cutlist
    const cutlistCreated = await this.cutlistsRepository.createCutlist(
      cutlistData,
    );

    return cutlistCreated;
  }
}
