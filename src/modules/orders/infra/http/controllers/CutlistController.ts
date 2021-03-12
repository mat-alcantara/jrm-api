import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteCutlistService from '@modules/orders/services/DeleteCutlistService';
import UpdateCutlistService from '@modules/orders/services/UpdateCutlistService';
import CreateCutlistService from '@modules/orders/services/CreateCutlistService';

export default class CutlistController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { cutlistData } = request.body;

    const createCutlistService = await container.resolve(CreateCutlistService);

    const orderUpdated = await createCutlistService.execute(id, cutlistData);

    return response.json(orderUpdated);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { cutlistId } = request.body;

    const deleteCutlistService = await container.resolve(DeleteCutlistService);

    await deleteCutlistService.execute(id, cutlistId);

    return response.json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { cutlistId, cutlistData } = request.body;

    const updateCutlistService = await container.resolve(UpdateCutlistService);

    const orderWithCutlistUpdated = await updateCutlistService.execute(
      id,
      cutlistId,
      cutlistData,
    );

    return response.json(orderWithCutlistUpdated);
  }
}
