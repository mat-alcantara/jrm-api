import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowAllOrdersService from '@modules/orders/services/ShowAllOrdersService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';

export default class CutlistController {
  public async create(request: Request, response: Response): Promise<Response> {
    const cutlistData = request.body;

    const createOrderService = await container.resolve(CreateOrderService);

    const cutlistCreated = await createOrderService.execute(cutlistData);

    return response.json(cutlistCreated);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showAllOrdersService = await container.resolve(ShowAllOrdersService);

    const allCutlists = await showAllOrdersService.execute();

    return response.json(allCutlists);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOrderService = await container.resolve(DeleteOrderService);

    await deleteOrderService.execute(id);

    return response.json();
  }
}
