import { container } from 'tsyringe';

import CreateCutlistService from '@modules/cutlist/services/CreateCutlistService';
import { Request, Response } from 'express';

export default class MaterialController {
  public async create(request: Request, response: Response): Promise<Response> {
    const cutlistData = request.body;

    const createCutlistService = await container.resolve(CreateCutlistService);

    const cutlistCreated = await createCutlistService.execute(cutlistData);

    return response.json(cutlistCreated);
  }
}
