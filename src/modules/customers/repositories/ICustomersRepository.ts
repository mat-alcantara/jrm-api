import CreateCustomerDTO from '@modules/customers/dtos/CreateCustomerDTO';

export default interface ICustomersRepository {
  create(data: CreateCustomerDTO): void; // Create a new customer
}
