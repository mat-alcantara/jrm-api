import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICreateCustomersDTO from '@modules/customers/dtos/CreateCustomerDTO';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class CreateCustomerSession {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  // Create a new customer
  public async execute(data: ICreateCustomersDTO): Promise<Customer> {
    const { name, email, telephone, area, city, state } = data;

    const customer = await this.customersRepository.create({
      name,
      email,
      telephone,
      area,
      city,
      state,
    });

    return customer;
  }
}