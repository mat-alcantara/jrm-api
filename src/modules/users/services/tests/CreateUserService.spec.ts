import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UserTypes from '@modules/users/dtos/UserTypes';

const fakeUsersRepository = new FakeUsersRepository();
const createUserService = new CreateUserService(fakeUsersRepository);

describe('Create User', () => {
  it('should create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Mateus',
      email: 'mateus@mateus.com',
      password: '12345',
      userType: UserTypes.PRODUCTION,
    });

    console.log(user);
    expect(user).toHaveProperty('id');
  });
});
