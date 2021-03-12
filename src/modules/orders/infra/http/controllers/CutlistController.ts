import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteCutlistService from '@modules/orders/services/DeleteCutlistService';

export default class CutlistController {
  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { cutlistId } = request.body;

    const deleteCutlistService = await container.resolve(DeleteCutlistService);

    await deleteCutlistService.execute(id, cutlistId);

    return response.json();
  }
}
