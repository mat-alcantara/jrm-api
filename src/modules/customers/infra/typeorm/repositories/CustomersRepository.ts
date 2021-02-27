import { getRepository, Repository } from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICustomerRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

export default class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async createCustomer(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = await this.ormRepository.create(data);

    this.ormRepository.save(customer);

    return customer;
  }

  public async deleteCustomerById(id: string): Promise<void> {}
}
