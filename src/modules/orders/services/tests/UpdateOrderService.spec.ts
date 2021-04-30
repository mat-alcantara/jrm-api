import AppError from '@shared/errors/AppError';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';

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

let createMaterialService: CreateMaterialService;
let fakeMaterialsRepository: FakeMaterialsRepository;

let fakeDateProvider: FakeDateProvider;

let updateOrderService: UpdateOrderService;

describe('Update Cutlist', () => {
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
    updateOrderService = new UpdateOrderService(fakeOrdersRepository);
  });

  it('Should update a specific order', async () => {
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
      price: 200,
      width: 1400,
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

    const orderUpdated = await updateOrderService.execute(orderCreated.id, {
      price: 700,
    });

    await expect(orderUpdated.price).toBe(700);
    await expect(orderUpdated.id).toBe(orderCreated.id);
  });

  it('Should not update a specific order if it does not exist', async () => {
    await expect(
      updateOrderService.execute('wrongId', {
        price: 200,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
