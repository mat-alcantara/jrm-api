import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';
import FakeDateProvider from '@shared/containers/providers/DateProvider/fakes/FakeDateProvider';
import UpdateDeliveryDateService from '@modules/orders/services/updateDeliveryDateService';

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
let updateDeliveryDateService: UpdateDeliveryDateService;

describe('Create orders', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);

    fakeDateProvider = new FakeDateProvider();

    fakeMaterialsRepository = new FakeMaterialsRepository();
    createMaterialService = new CreateMaterialService(fakeMaterialsRepository);

    fakeOrdersRepository = new FakeOrdersRepository();

    updateDeliveryDateService = new UpdateDeliveryDateService(
      fakeOrdersRepository,
      fakeDateProvider,
    );

    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeCustomersRepository,
      fakeMaterialsRepository,
      fakeDateProvider,
    );
  });

  it('Should update a deliveryDate without a given date', async () => {
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

    const orderUpdated = await updateDeliveryDateService.execute(
      orderCreated.id,
    );

    await expect(orderUpdated).toHaveProperty('id');
    await expect(orderUpdated.deliveryDate).toEqual('01/01/2001');
  });

  it('Should update a deliveryDate with a given date', async () => {
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

    const today = new Date(Date.now());

    const orderUpdated = await updateDeliveryDateService.execute(
      orderCreated.id,
      today,
    );

    await expect(orderUpdated).toHaveProperty('id');
    await expect(orderUpdated.deliveryDate).toEqual('01/01/2001');
  });

  it('Should not update a delivery date if order does not exist', async () => {
    await expect(
      updateDeliveryDateService.execute('wrongId'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
