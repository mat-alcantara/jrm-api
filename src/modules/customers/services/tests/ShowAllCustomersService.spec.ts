import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ShowAllCustomersService from '@modules/customers/services/ShowAllCustomersService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let showAllCustomersService: ShowAllCustomersService;

describe('Show all customers', () => {
  // This function will be activated every time a test is created
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    showAllCustomersService = new ShowAllCustomersService(
      fakeCustomersRepository,
    );
  });

  // Test the deletion of a user
  it('should be able to show all customers', async () => {
    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      street: 'Travessa dos Coqueiros',

      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    const allCustomers = await showAllCustomersService.execute();

    await expect(allCustomers).toContain(customerCreated);
  });
});
