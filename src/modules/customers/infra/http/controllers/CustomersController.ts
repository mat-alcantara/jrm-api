import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ShowAllCustomersService from '@modules/customers/services/ShowAllCustomersService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';

export default class CustomersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showAllCustomersService = await container.resolve(
      ShowAllCustomersService,
    );

    const allCustomers = await showAllCustomersService.execute();

    return response.json(allCustomers);
  }

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteCustomerService = await container.resolve(
      DeleteCustomerService,
    );

    await deleteCustomerService.execute(id);

    return response.status(200).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;

    const updateCustomerService = await container.resolve(
      UpdateCustomerService,
    );

    const customerUpdated = await updateCustomerService.execute(id, data);

    return response.json(customerUpdated);
  }
}
