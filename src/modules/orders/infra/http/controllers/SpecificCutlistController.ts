import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowSpecificOrderService from '@modules/orders/services/ShowSpecificOrderService';

export default class SpecificCutlistController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSpecificOrderService = await container.resolve(
      ShowSpecificOrderService,
    );

    const specificCutlist = await showSpecificOrderService.execute(id);

    return response.json(specificCutlist);
  }
}
