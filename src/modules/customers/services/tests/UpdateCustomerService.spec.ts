import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let updateCustomerService: UpdateCustomerService;

describe('Update Customers', () => {
  // This function will be activated every time a test is created
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    updateCustomerService = new UpdateCustomerService(fakeCustomersRepository);
  });

  // Test the deletion of a user
  it('should be able to update a customers', async () => {
    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    const customerUpdated = await updateCustomerService.execute(
      customerCreated.id,
      { area: 'Japuiba' },
    );

    expect(customerUpdated.area).toBe('Japuiba');
    expect(customerCreated.id).toEqual(customerCreated.id);
  });
});
