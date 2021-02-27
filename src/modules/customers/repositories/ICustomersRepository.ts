import CreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export default interface ICustomersRepository {
  createCustomer(data: CreateCustomerDTO): Promise<Customer>; // Create a new customer
  deleteCustomerById(id: string): Promise<void>;
  findCustomerById(id: string): Promise<Customer | undefined>;
  showAllCustomers(): Promise<Customer[]>;
}
