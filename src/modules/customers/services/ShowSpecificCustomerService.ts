import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class ShowAllCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: string): Promise<Customer> {
    const specificCustomer = await this.customersRepository.findCustomerById(
      id,
    );

    if (!specificCustomer) {
      throw new AppError('Customer does not exist', 404);
    }

    return specificCustomer;
  }
}
