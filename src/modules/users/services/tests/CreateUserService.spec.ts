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
  it('should be able to create a new user', async () => {
    // Spy the function createHash to check if it was called
    const createHash = await jest.spyOn(fakeHashProvider, 'createHash');

    // Create a new user
    const user = await createUserService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      password: '12345',
      userType: UserTypes.PRODUCTION,
    });

    await expect(createHash).toHaveBeenCalledWith('12345');
    await expect(user).toHaveProperty('id');
  });

  // Test the creation of a new user
  it('should not be able to create two users with same email', async () => {
    // Create a new user
    await createUserService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      password: '12345',
      userType: UserTypes.PRODUCTION,
    });

    // Try to create a new user with same email and expect to return an error
    await expect(
      createUserService.execute({
        name: 'Mateus',
        email: 'mateus@mateus.com',
        password: '12345',
        userType: UserTypes.PRODUCTION,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
