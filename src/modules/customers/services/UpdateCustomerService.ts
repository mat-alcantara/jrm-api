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

  public async execute(
    id: string,
    data: IUpdateCustomerDTO,
  ): Promise<Customer> {
    // Find customer
    const customer = await this.customersRepository.findCustomerById(id);

    if (!customer) {
      throw new AppError('Customer does not exist', 404);
    }

    const customerUpdated = this.customersRepository.updateCustomer(
      customer,
      data,
    );

    return customerUpdated;
  }
}
