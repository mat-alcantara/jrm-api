import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    // Load CreateCustomersService with dependency injection
    const createCustomerService = container.resolve(CreateCustomerService);

    const { name, email, telephone, area, city, state } = request.body;

    const customerCreated = await createCustomerService.execute({
      name,
      email,
      telephone,
      area,
      city,
      state,
    });

    return response.json(customerCreated);
  }
}
