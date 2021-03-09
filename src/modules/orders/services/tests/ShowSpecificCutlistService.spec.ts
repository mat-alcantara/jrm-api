import AppError from '@shared/errors/AppError';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ShowSpecificOrderService from '@modules/orders/services/ShowSpecificOrderService';

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import FakeCutlistsRepository from '@modules/orders/repositories/fakes/FakeCutlistsRepository';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let fakeCutlistsRepository: FakeCutlistsRepository;
let createOrderService: CreateOrderService;
let showSpecificOrderService: ShowSpecificOrderService;

describe('Show specific orders', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    fakeCutlistsRepository = new FakeCutlistsRepository();
    createOrderService = new CreateOrderService(
      fakeCutlistsRepository,
      fakeCustomersRepository,
    );
    showSpecificOrderService = new ShowSpecificOrderService(
      fakeCutlistsRepository,
    );
  });

  it('Should show a specific order', async () => {
    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    const cutlistCreated = await createOrderService.execute({
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

    const specificCutlist = await showSpecificOrderService.execute(
      cutlistCreated.id,
    );

    await expect(specificCutlist).toEqual(cutlistCreated);
  });

  it('Should not show a specific order if it do not exist', async () => {
    await expect(
      showSpecificOrderService.execute('wrongId'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
