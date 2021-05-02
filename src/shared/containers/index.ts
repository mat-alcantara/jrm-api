import { container } from 'tsyringe';

import '@shared/containers/providers/HashProvider/index';
import '@shared/containers/providers/AuthProvider/index';
import '@shared/containers/providers/DateProvider/index';
import '@shared/containers/providers/PDFProvider/index';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import MaterialsRepository from '@modules/materials/infra/typeorm/repositories/MaterialsRepository';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IMaterialsRepository>(
  'MaterialsRepository',
  MaterialsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);
