import ICustomerRepository from '@modules/customers/repositories/ICustomersRepository';
import CreateCustomerDTO from '@modules/customers/dtos/CreateCustomerDTO';
import { uuid } from 'uuidv4';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export default class FakeCustomerRepository implements ICustomerRepository {
  private customersCreated: Customer[];

  constructor() {
    this.customersCreated = [];
  }

  public async create(customerData: CreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { id: uuid() }, customerData);

    this.customersCreated.push(customer);

    return customer;
  }
}