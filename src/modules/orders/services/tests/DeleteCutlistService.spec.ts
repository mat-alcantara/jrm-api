import AppError from '@shared/errors/AppError';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCutlistService from '@modules/orders/services/DeleteCutlistService';
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

let createMaterialService: CreateMaterialService;
let fakeMaterialsRepository: FakeMaterialsRepository;

let deleteCutlistService: DeleteCutlistService;

let fakeDateProvider: FakeDateProvider;

describe('Delete Cutlist', () => {
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

    deleteCutlistService = new DeleteCutlistService(fakeOrdersRepository);
  });

  it('Should remove a specific cutlist', async () => {
    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      street: 'Travessa dos Coqueiros',

      email: 'mateus@mateus.com',
      area: 'Frade',
      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    const materialCreated = await createMaterialService.execute({
      name: 'MDF 15mm Comum',
      height: 1550,
      price: 144,
      width: 1333,
    });

    const orderCreated = await createOrderService.execute({
      customerId: customerCreated.id,
      orderStatus: OrderStatusEnumDTO.PRODUCAO,
      orderStore: OrderStoreEnumDTO.FRADE,
      paymentStatus: PaymentStatusEnumDTO.PARCIAL,
      price: 215,
      cutlist: [
        {
          id: 'corte0',
          material_id: materialCreated.id,
          quantidade: 20,
          side_a_size: 500,
          side_b_size: 200,
          side_a_border: 1,
          side_b_border: 2,
        },
        {
          id: 'corte1',
          material_id: materialCreated.id,
          quantidade: 20,
          side_a_size: 800,
          side_b_size: 400,
          side_a_border: 0,
          side_b_border: 2,
        },
      ],
    });

    const spyDeleteCutlist = await spyOn(fakeOrdersRepository, 'deleteCutlist');

    await deleteCutlistService.execute(
      orderCreated.id,
      orderCreated.cutlist[0].id,
    );

    expect(spyDeleteCutlist).toBeCalledWith(
      orderCreated,
      orderCreated.cutlist[0].id,
    );
  });

  it('Should not remove a specific cutlist if it does not exist', async () => {
    await expect(
      deleteCutlistService.execute('wrongId', 'wrongCutlistId'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
