import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class ShowAllCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<Customer[]> {
    const allCustomers = await this.customersRepository.showAllCustomers();

    return allCustomers;
  }
}
