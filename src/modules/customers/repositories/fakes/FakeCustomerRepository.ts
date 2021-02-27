import ICustomerRepository from '@modules/customers/repositories/ICustomersRepository';
import CreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import { uuid } from 'uuidv4';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export default class FakeCustomerRepository implements ICustomerRepository {
  private customersCreated: Customer[];

  constructor() {
    this.customersCreated = [];
  }

  // Create a new Customer
  public async createCustomer(
    customerData: CreateCustomerDTO,
  ): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { id: uuid() }, customerData);

    this.customersCreated.push(customer);

    return customer;
  }

  // Delete a customer by id
  public async deleteCustomerById(id: string): Promise<void> {
    const customersWithDifferentId = this.customersCreated.filter(
      customer => customer.id !== id,
    );

    this.customersCreated = customersWithDifferentId;
  }
}
