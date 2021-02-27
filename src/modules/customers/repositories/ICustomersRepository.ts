import CreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export default interface ICustomersRepository {
  create(data: CreateCustomerDTO): Promise<Customer>; // Create a new customer
}
