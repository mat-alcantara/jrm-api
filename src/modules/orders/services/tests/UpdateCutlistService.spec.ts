import AppError from '@shared/errors/AppError';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import UpdateCutlistService from '@modules/orders/services/UpdateCutlistService';
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

let updateCutlistService: UpdateCutlistService;
let fakeDateProvider: FakeDateProvider;

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
    updateCutlistService = new UpdateCutlistService(fakeOrdersRepository);
  });

  it('Should update a specific cutlist', async () => {
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

    const secondMaterialCreated = await createMaterialService.execute({
      name: 'MDF 15mm Ultra',
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

    const cutlistUpdated = await updateCutlistService.execute(
      orderCreated.id,
      orderCreated.cutlist[0].id,
      { material_id: secondMaterialCreated.id },
    );

    await expect(cutlistUpdated.cutlist[0].material_id).toBe(
      secondMaterialCreated.id,
    );
  });

  it('Should not update a specific cutlist if it does not exist', async () => {
    await expect(
      updateCutlistService.execute('wrongId', 'wrongCutlistId', {
        material_id: 'MDF',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
