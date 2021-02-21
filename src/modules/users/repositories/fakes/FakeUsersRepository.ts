import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  // Array containing all users created
  private usersCreated: User[] = [];

  // Create a new User
  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.usersCreated.push(user);

    return user;
  }

  // Find a User by email
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.usersCreated.find(
      userCreated => userCreated.email === email,
    );

    return user;
  }
}
