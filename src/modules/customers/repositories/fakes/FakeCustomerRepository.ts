import ICustomerRepository from '@modules/customers/repositories/ICustomersRepository';
import IUpdateCustomerDTO from '@modules/customers/dtos/IUpdateCustomerDTO';

import CreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import { v4 as uuid_v4 } from 'uuid';

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

    Object.assign(customer, { id: uuid_v4() }, customerData);

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

  // Find a customer by id
  public async findCustomerById(id: string): Promise<Customer | undefined> {
    const customerFound = await this.customersCreated.find(
      customer => customer.id === id,
    );

    return customerFound;
  }

  // Show all customers
  public async showAllCustomers(): Promise<Customer[]> {
    return this.customersCreated;
  }

  // Update a customer
  public async updateCustomer(
    customer: Customer,
    data: IUpdateCustomerDTO,
  ): Promise<Customer> {
    // Create an updated customer
    const updatedCustomer = { ...customer, ...data };

    // Delete old customer from database
    await this.customersCreated.splice(
      this.customersCreated.indexOf(customer),
      1,
    );

    // Add new customer to database
    await this.customersCreated.push(updatedCustomer);

    return updatedCustomer;
  }
}
