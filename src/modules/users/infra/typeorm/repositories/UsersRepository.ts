import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import CreateUsersDTO from '@modules/users/dtos/CreateUserDTO';
import { getRepository, Repository } from 'typeorm';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: CreateUsersDTO): Promise<User> {
    const user = await this.ormRepository.create(data);

    this.ormRepository.save(user);

    return user;
  }
}
