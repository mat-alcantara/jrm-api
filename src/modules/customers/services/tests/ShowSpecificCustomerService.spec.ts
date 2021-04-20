import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ShowSpecificCustomerService from '@modules/customers/services/ShowSpecificCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';

import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let showSpecificCustomerService: ShowSpecificCustomerService;

describe('Show specific customer', () => {
  // This function will be activated every time a test is created
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    showSpecificCustomerService = new ShowSpecificCustomerService(
      fakeCustomersRepository,
    );
  });

  it('should be able to show a specific customers', async () => {
    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      street: 'Travessa dos Coqueiros',

      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    const specificCustomer = await showSpecificCustomerService.execute(
      customerCreated.id,
    );

    await expect(specificCustomer.id).toEqual(customerCreated.id);
  });

  it('should not be able to show a specific customers if it does not exist', async () => {
    await expect(
      showSpecificCustomerService.execute('wrongId'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
