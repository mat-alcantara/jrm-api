import UpdateDeliveryDateService from '@modules/orders/services/updateDeliveryDateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SpecificCutlistController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { deliveryDate } = request.body;

    const updateDeliveryDateService = await container.resolve(
      UpdateDeliveryDateService,
    );

    const orderWithDateUpdated = await updateDeliveryDateService.execute(
      id,
      deliveryDate,
    );

    return response.json(orderWithDateUpdated);
  }
}
