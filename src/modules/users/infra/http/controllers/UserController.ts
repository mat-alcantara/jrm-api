import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UserController {
  // Create a new user using the CreateUserService
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, userType } = request.body;

    // Inject dependencies on service and create it
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      userType,
    });

    return response.json(user);
  }
}
