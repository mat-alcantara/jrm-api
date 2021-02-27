import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class CreateCustomerSession {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  // Create a new customer
  public async execute(id: string): Promise<void> {
    const checkIfCustomerExist = await this.customersRepository.findCustomerById(
      id,
    );

    if (!checkIfCustomerExist) {
      throw new AppError('Customer does not exists', 404);
    }

    await this.customersRepository.deleteCustomerById(id);
  }
}
