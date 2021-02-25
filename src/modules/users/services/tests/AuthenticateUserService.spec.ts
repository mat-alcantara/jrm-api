import AppError from '@shared/errors/AppError';

import UserTypes from '@modules/users/dtos/UserTypes';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider';
import FakeAuthProvider from '@shared/containers/providers/AuthProvider/fakes/FakeAuthProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeAuthProvider: FakeAuthProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('Authenticate User', () => {
  // This function will be activated every time a test is created
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeAuthProvider = new FakeAuthProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeAuthProvider,
    );
  });

  // Test the creation of a new token
  it('should generate a new token', async () => {
    await createUserService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      password: '12345',
      userType: UserTypes.PRODUCTION,
    });

    const token = await authenticateUserService.execute(
      'mateus@mateus.com',
      '12345',
    );

    expect(token).toHaveProperty('token');
  });

  // Test if generation fails in case of wrong email
  it('should not generate a token if email is invalid', async () => {
    await expect(
      authenticateUserService.execute('mateus@mateus.com', '12345'),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Test if generation fails in case of wrong password
  it('should not generate a token if password is invalid', async () => {
    await createUserService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      password: '12345',
      userType: UserTypes.PRODUCTION,
    });

    await expect(
      authenticateUserService.execute('mateus@mateus.com', '123456'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
