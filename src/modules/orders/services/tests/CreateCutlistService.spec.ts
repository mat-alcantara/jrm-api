import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import CreateCutlistService from '@modules/orders/services/CreateCutlistService';
import FakeDateProvider from '@shared/containers/providers/DateProvider/fakes/FakeDateProvider';
import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';
import CreateMaterialService from '@modules/materials/services/CreateMaterialService';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';

import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

let fakeOrdersRepository: FakeOrdersRepository;
let createOrderService: CreateOrderService;

let createCutlistService: CreateCutlistService;
let fakeDateProvider: FakeDateProvider;

let createMaterialService: CreateMaterialService;
let fakeMaterialsRepository: FakeMaterialsRepository;

describe('Create orders', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);

    fakeMaterialsRepository = new FakeMaterialsRepository();
    createMaterialService = new CreateMaterialService(fakeMaterialsRepository);

    fakeDateProvider = new FakeDateProvider();

    fakeOrdersRepository = new FakeOrdersRepository();
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeCustomersRepository,
      fakeMaterialsRepository,
      fakeDateProvider,
    );
    createCutlistService = new CreateCutlistService(fakeOrdersRepository);
  });

  it('Should create a new cutlist', async () => {
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
      height: 1400,
      width: 1500,
      price: 300,
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

    const createdCutlist = await createCutlistService.execute(orderCreated.id, {
      id: '',
      material_id: materialCreated.id,
      quantidade: 2,
      side_a_border: 1,
      side_a_size: 300,
      side_b_border: 2,
      side_b_size: 400,
      price: 100,
    });

    await expect(createdCutlist.id).toEqual(orderCreated.id);
  });

  it('Should not create a new cutlist if order does not exist', async () => {
    await expect(
      createCutlistService.execute('wrongId', {
        id: '',
        material_id: 'MDF Criado',
        quantidade: 2,
        side_a_border: 1,
        side_a_size: 300,
        side_b_border: 2,
        side_b_size: 400,
        price: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
