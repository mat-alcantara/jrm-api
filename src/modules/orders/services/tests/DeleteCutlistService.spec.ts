import AppError from '@shared/errors/AppError';

import CreateCutlistService from '@modules/orders/services/CreateCutlistService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCutlistService from '@modules/orders/services/DeleteCutlistService';

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import FakeCutlistsRepository from '@modules/orders/repositories/fakes/FakeCutlistsRepository';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let fakeCutlistsRepository: FakeCutlistsRepository;
let createCutlistService: CreateCutlistService;
let deleteCutlistService: DeleteCutlistService;

describe('Show specific cutlist', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    fakeCutlistsRepository = new FakeCutlistsRepository();
    createCutlistService = new CreateCutlistService(
      fakeCutlistsRepository,
      fakeCustomersRepository,
    );
    deleteCutlistService = new DeleteCutlistService(fakeCutlistsRepository);
  });

  it('Should remove a specific cutlist', async () => {
    const spyFunction = spyOn(fakeCutlistsRepository, 'deleteCutlist');

    const customerCreated = await createCustomerService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      area: 'Frade',
      telephone: ['24-999710064', '24-999656973'],
      city: 'Angra dos Reis',
      state: 'Rio de Janeiro',
    });

    const cutlistCreated = await createCutlistService.execute({
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

    await deleteCutlistService.execute(cutlistCreated.id);

    expect(spyFunction).toBeCalledWith(cutlistCreated);
  });

  it('Should not remove a specific cutlist if it do not exist', async () => {
    expect(deleteCutlistService.execute('wrongId')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
