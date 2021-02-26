// import AppError from '@shared/errors/AppError';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('Create Customers', () => {
  // This function will be activated every time a test is created
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
  });

  // Test the creation of a new user
  it('should be able to create a new customer', async () => {
    // Create a new customer
    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    await expect(customerCreated).toHaveProperty('id');
  });

  // Test the creation of a new user
});
