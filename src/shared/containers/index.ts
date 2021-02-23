import { container } from 'tsyringe';

import '@shared/containers/providers/HashProvider/index'; // Import Hash Provider Injection
import '@shared/containers/providers/AuthProvider/index'; // Import Auth Provider Injection

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
