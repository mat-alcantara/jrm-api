import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider';

import UserTypes from '@modules/users/dtos/UserTypes';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('Create User', () => {
  // This function will be activated every time a test is created
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  // Test the creation of a new user
  it('should create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      password: '12345',
      userType: UserTypes.PRODUCTION,
    });

    expect(user).toHaveProperty('id');
  });
});
