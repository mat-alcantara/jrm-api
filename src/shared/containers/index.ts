import { container } from 'tsyringe';

import '@shared/containers/providers/HashProvider/index'; // Import Hash Provider Injection
import '@shared/containers/providers/AuthProvider/index'; // Import Auth Provider Injection

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
