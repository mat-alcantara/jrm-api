import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import FakeDateProvider from '@shared/containers/providers/DateProvider/fakes/FakeDateProvider';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';

import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let fakeOrdersRepository: FakeOrdersRepository;
let createOrderService: CreateOrderService;
let fakeDateProvider: FakeDateProvider;

describe('Create orders', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeDateProvider = new FakeDateProvider();
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeCustomersRepository,
      fakeDateProvider,
    );
  });

  it('Should create a new order', async () => {
    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      street: 'Travessa dos Coqueiros',

      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
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

    await expect(orderCreated).toHaveProperty('id');
    await expect(orderCreated.customerId).toEqual(customerCreated.id);
  });

  it('Should not create a new order if customer does not exist', async () => {
    await expect(
      createOrderService.execute({
        customerId: 'wrongId',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
