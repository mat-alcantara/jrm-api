import AppError from '@shared/errors/AppError';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider';

import UserTypes from '@modules/users/dtos/UserTypes';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('Authenticate User', () => {
  // This function will be activated every time a test is created
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  // Test the creation of a new token
  it('should generate a new token', async () => {});
});
