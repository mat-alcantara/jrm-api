import CreateOrderService from '@modules/orders/services/CreateOrderService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ShowAllOrdersService from '@modules/orders/services/ShowAllOrdersService';
import CreateMaterialService from '@modules/materials/services/CreateMaterialService';

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';
import FakeDateProvider from '@shared/containers/providers/DateProvider/fakes/FakeDateProvider';
import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';
import DeliveryTypeEnumDTO from '@modules/orders/dtos/DeliveryTypeEnumDTO';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

let fakeOrdersRepository: FakeOrdersRepository;
let createOrderService: CreateOrderService;
let showAllOrdersService: ShowAllOrdersService;

let createMaterialService: CreateMaterialService;
let fakeMaterialsRepository: FakeMaterialsRepository;

let fakeDateProvider: FakeDateProvider;

describe('Show All Orders', () => {
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
    showAllOrdersService = new ShowAllOrdersService(fakeOrdersRepository);
  });

  it('Should show all orders created', async () => {
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
      height: 1550,
      price: 300,
      width: 100,
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

    const allOrders = await showAllOrdersService.execute();

    await expect(allOrders).toContain(orderCreated);
  });
});
