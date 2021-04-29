import AppError from '@shared/errors/AppError';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ShowSpecificOrderService from '@modules/orders/services/ShowSpecificOrderService';
import CreateMaterialService from '@modules/materials/services/CreateMaterialService';

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakeDateProvider from '@shared/containers/providers/DateProvider/fakes/FakeDateProvider';
import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

let fakeOrdersRepository: FakeOrdersRepository;
let createOrderService: CreateOrderService;

let showSpecificOrderService: ShowSpecificOrderService;

let createMaterialService: CreateMaterialService;
let fakeMaterialsRepository: FakeMaterialsRepository;

let fakeDateProvider: FakeDateProvider;

describe('Show specific orders', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);

    fakeDateProvider = new FakeDateProvider();

    fakeMaterialsRepository = new FakeMaterialsRepository();
    createMaterialService = new CreateMaterialService(fakeMaterialsRepository);

    fakeOrdersRepository = new FakeOrdersRepository();
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeCustomersRepository,
      fakeMaterialsRepository,
      fakeDateProvider,
    );
    showSpecificOrderService = new ShowSpecificOrderService(
      fakeOrdersRepository,
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
      street: 'Travessa dos Coqueiros',
    });

    const materialCreated = await createMaterialService.execute({
      name: 'MDF 15mm Comum',
      height: 1200,
      width: 1400,
      price: 200,
    });

    const orderCreated = await createOrderService.execute({
      customerId: customerCreated.id,
      orderStatus: OrderStatusEnumDTO.PRODUCAO,
      orderStore: OrderStoreEnumDTO.FRADE,
      paymentStatus: PaymentStatusEnumDTO.PARCIAL,
      price: 215,
      cutlist: [
        {
          id: '',
          material_id: materialCreated.id,
          quantidade: 20,
          side_a_size: 500,
          side_b_size: 200,
          side_a_border: 1,
          side_b_border: 2,
        },
        {
          id: '',
          material_id: materialCreated.id,
          quantidade: 20,
          side_a_size: 800,
          side_b_size: 400,
          side_a_border: 0,
          side_b_border: 2,
        },
      ],
    });

    const specificOrder = await showSpecificOrderService.execute(
      orderCreated.id,
    );

    await expect(specificOrder).toEqual(orderCreated);
  });

  it('Should not show a specific order if it do not exist', async () => {
    await expect(
      showSpecificOrderService.execute('wrongId'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
