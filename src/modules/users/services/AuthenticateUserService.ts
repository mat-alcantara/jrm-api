import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/containers/providers/HashProvider/models/IHashProvider';

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(email: string, password: string): Promise<void> {
    // Find the user by his email
    const user = await this.usersRepository.findByEmail(email);

    // If user doesn't exist, throw a new error
    if (!user) {
      throw new AppError('Incorrect email/password combination');
    }

    // Check if the password is the same as the user's password
    const isPasswordCorrect = this.hashProvider.checkHash(
      password,
      user.password,
    );

    // If password is incorrect, throw a new error
    if (!isPasswordCorrect) {
      throw new AppError('Incorrect email/password combination');
    }
  }
}
