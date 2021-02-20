import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

export default interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
}
