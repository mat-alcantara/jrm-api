import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import IUpdateCustomerDTO from '@modules/customers/dtos/IUpdateCustomerDTO';
import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(data: IUpdateCustomerDTO): Promise<Customer> {
    const customerToUpdate = await this.customersRepository.findCustomerById(
      data.id,
    );

    if (!customerToUpdate) {
      throw new AppError('Customer does not exist', 404);
    }

    const customerAfterUpdate = await this.customersRepository.updateCustomer(
      customerToUpdate,
      data,
    );

    return customerAfterUpdate;
  }
}
