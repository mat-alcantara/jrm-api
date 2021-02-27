import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class CreateCustomerSession {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  // Create a new customer
  public async execute(id: string): Promise<void> {
    this.customersRepository.deleteCustomerById(id);
  }
}
