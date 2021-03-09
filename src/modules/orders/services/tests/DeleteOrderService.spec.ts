import AppError from '@shared/errors/AppError';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let fakeOrdersRepository: FakeOrdersRepository;
let createOrderService: CreateOrderService;
let deleteOrderService: DeleteOrderService;

describe('Delete Orders', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    fakeOrdersRepository = new FakeOrdersRepository();
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeCustomersRepository,
    );
    deleteOrderService = new DeleteOrderService(fakeOrdersRepository);
  });

  it('Should remove a specific order', async () => {
    const spyFunction = spyOn(fakeOrdersRepository, 'deleteCutlist');

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

    await deleteOrderService.execute(cutlistCreated.id);

    expect(spyFunction).toBeCalledWith(cutlistCreated);
  });

  it('Should not remove a specific order if it do not exist', async () => {
    expect(deleteOrderService.execute('wrongId')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
