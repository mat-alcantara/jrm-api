import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';
import FakeDateProvider from '@shared/containers/providers/DateProvider/fakes/FakeDateProvider';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';
import DeliveryTypeEnumDTO from '@modules/orders/dtos/DeliveryTypeEnumDTO';

import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let fakeOrdersRepository: FakeOrdersRepository;
let createOrderService: CreateOrderService;
let fakeDateProvider: FakeDateProvider;
let fakeMaterialsRepository: FakeMaterialsRepository;
let createMaterialService: CreateMaterialService;

describe('Create orders', () => {
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

    const materialCreated = await createMaterialService.execute({
      name: 'MDF 15mm Comum',
      price: 300,
      height: 2750,
      width: 1850,
    });

    const orderCreated = await createOrderService.execute({
      customerId: customerCreated.id,
      orderStatus: OrderStatusEnumDTO.PRODUCAO,
      orderStore: OrderStoreEnumDTO.FRADE,
      paymentStatus: PaymentStatusEnumDTO.PARCIAL,
      price: 215,
      delivery_type: DeliveryTypeEnumDTO.ENTREGA,
      cutlist: [
        {
          id: '',
          material_id: materialCreated.id,
          quantidade: 20,
          side_a_size: 500,
          side_b_size: 200,
          side_a_border: 1,
          side_b_border: 2,
          price: 100,
        },
        {
          id: '',
          material_id: materialCreated.id,
          quantidade: 20,
          side_a_size: 800,
          side_b_size: 400,
          side_a_border: 0,
          side_b_border: 2,
          price: 100,
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
        delivery_type: DeliveryTypeEnumDTO.ENTREGA,
        cutlist: [
          {
            id: '',
            material_id: 'wrongId',
            quantidade: 20,
            side_a_size: 500,
            side_b_size: 200,
            side_a_border: 1,
            side_b_border: 2,
            price: 100,
          },
          {
            id: '',
            material_id: 'wrongId',
            quantidade: 20,
            side_a_size: 800,
            side_b_size: 400,
            side_a_border: 0,
            side_b_border: 2,
            price: 100,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not create a new order if material does not exist', async () => {
    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      street: 'Travessa dos Coqueiros',

      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    await expect(
      createOrderService.execute({
        customerId: customerCreated.id,
        orderStatus: OrderStatusEnumDTO.PRODUCAO,
        orderStore: OrderStoreEnumDTO.FRADE,
        paymentStatus: PaymentStatusEnumDTO.PARCIAL,
        price: 215,
        delivery_type: DeliveryTypeEnumDTO.ENTREGA,
        cutlist: [
          {
            id: '',
            material_id: 'wrongId',
            quantidade: 20,
            side_a_size: 500,
            side_b_size: 200,
            side_a_border: 1,
            side_b_border: 2,
            price: 100,
          },
          {
            id: '',
            material_id: 'wrongId',
            quantidade: 20,
            side_a_size: 800,
            side_b_size: 400,
            side_a_border: 0,
            side_b_border: 2,
            price: 100,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
