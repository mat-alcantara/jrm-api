import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/containers/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User> {
    const { name, email, password, userType } = data;

    // Use findByEmail method to check if the user exists
    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    // If user exists, it'll return a error
    if (checkIfUserExists) {
      throw new AppError('User already exists');
    }

    // Hash the password with bcrypt
    const hashedPassword = await this.hashProvider.createHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword, // Database will have only the hashed password
      userType,
    });

    return user;
  }
}
