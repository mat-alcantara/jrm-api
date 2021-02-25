import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// Interfaces
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/containers/providers/HashProvider/models/IHashProvider';
import IAuthProvider from '@shared/containers/providers/AuthProvider/models/IAuthProvider';
import IAuthResponseDTO from '@modules/users/dtos/IAuthResponseDTO';

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AuthProvider')
    private authProvider: IAuthProvider,
  ) {}

  public async execute(
    email: string,
    password: string,
  ): Promise<IAuthResponseDTO> {
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

    // Generate a new token
    const token = await this.authProvider.generateToken(user.id);

    // Return token and user
    return { user, token };
  }
}
