import CreateCutlistService from '@modules/cutlist/services/CreateCutlistService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ShowAllCutlists from '@modules/cutlist/services/ShowAllCutlistsService';

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import FakeCutlistsRepository from '@modules/cutlist/repositories/fakes/FakeCutlistsRepository';

import OrderStatusEnumDTO from '@modules/cutlist/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/cutlist/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/cutlist/dtos/PaymentStatusEnumDTO';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let fakeCutlistsRepository: FakeCutlistsRepository;
let createCutlistService: CreateCutlistService;
let showAllCutlists: ShowAllCutlists;

describe('Show All Cutlists', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    fakeCutlistsRepository = new FakeCutlistsRepository();
    createCutlistService = new CreateCutlistService(
      fakeCutlistsRepository,
      fakeCustomersRepository,
    );
    showAllCutlists = new ShowAllCutlists(fakeCutlistsRepository);
  });

  it('Should show all cutlists created', async () => {
    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    const cutlistCreated = await createCutlistService.execute({
      customerId: customerCreated.id,
      orderStatus: OrderStatusEnumDTO.PRODUCAO,
      orderStore: OrderStoreEnumDTO.FRADE,
      paymentStatus: PaymentStatusEnumDTO.PARCIAL,
      price: 215,
      cutlist: [
        {
          id: '',
          material: 'MDF 15mm Comum',
          quantidade: 20,
          side_a_size: 500,
          side_b_size: 200,
          side_a_border: 1,
          side_b_border: 2,
        },
        {
          id: '',
          material: 'MDF 15mm Ultra',
          quantidade: 20,
          side_a_size: 800,
          side_b_size: 400,
          side_a_border: 0,
          side_b_border: 2,
        },
      ],
    });

    const allCutlists = await showAllCutlists.execute();

    await expect(allCutlists).toContain(cutlistCreated);
  });
});
