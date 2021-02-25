import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class AuthController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    // Create a new instance of AuthenticateUserService
    const authenticateUserService = await container.resolve(
      AuthenticateUserService,
    );

    // Execute the service using email and password given on req.body
    const { user, token } = await authenticateUserService.execute(
      email,
      password,
    );

    // Return user and token
    return res.json(classToClass({ user, token }));
  }
}
