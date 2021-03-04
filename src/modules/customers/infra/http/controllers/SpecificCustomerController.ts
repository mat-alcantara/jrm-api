import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowSpecificCustomerService from '@modules/customers/services/ShowSpecificCustomerService';

export default class CustomersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSpecificCustomersService = await container.resolve(
      ShowSpecificCustomerService,
    );

    const specificCustomer = await showSpecificCustomersService.execute(id);

    return response.json(specificCustomer);
  }
}
