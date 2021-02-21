import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<void> {
    const { name, email, password, userType } = data;

    const user = await this.usersRepository.create({
      name,
      email,
      password,
      userType,
    });

    return user;
  }
}
