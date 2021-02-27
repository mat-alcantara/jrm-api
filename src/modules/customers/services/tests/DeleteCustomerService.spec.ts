import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomerService: DeleteCustomerService;
let createCustomerService: CreateCustomerService;

describe('Delete Customers', () => {
  // This function will be activated every time a test is created
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    deleteCustomerService = new DeleteCustomerService(fakeCustomersRepository);
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
  });

  // Test the deletion of a user
  it('should be able to delete a customer', async () => {
    const spyDeleteCustomerById = spyOn(
      fakeCustomersRepository,
      'deleteCustomerById',
    );

    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    await deleteCustomerService.execute(customerCreated.id);

    expect(spyDeleteCustomerById).toHaveBeenCalledWith(customerCreated.id);
  });

  // Test the creation of a new user
});
