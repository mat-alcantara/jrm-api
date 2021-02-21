import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm';

export default class UsersRepository implements IUsersRepository {
  // User Repository
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  // Method used to create a new User in database
  public async create(data: ICreateUsersDTO): Promise<User> {
    const user = await this.ormRepository.create(data);

    this.ormRepository.save(user);

    return user;
  }

  // Method used to find a user by his email
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }
}
