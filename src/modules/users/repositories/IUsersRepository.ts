import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

export default interface IUsersRepository {
  create({ email, name, password, userType }: CreateUserDTO): Promise<User>;
}
