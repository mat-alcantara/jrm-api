import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCutlistService from '@modules/cutlist/services/CreateCutlistService';
import ShowAllCutlists from '@modules/cutlist/services/ShowAllCutlistsService';
import DeleteCutlistService from '@modules/cutlist/services/DeleteCutlistService';

export default class CutlistController {
  public async create(request: Request, response: Response): Promise<Response> {
    const cutlistData = request.body;

    const createCutlistService = await container.resolve(CreateCutlistService);

    const cutlistCreated = await createCutlistService.execute(cutlistData);

    return response.json(cutlistCreated);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showAllCutlists = await container.resolve(ShowAllCutlists);

    const allCutlists = await showAllCutlists.execute();

    return response.json(allCutlists);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCutlistService = await container.resolve(DeleteCutlistService);

    await deleteCutlistService.execute(id);

    return response.json();
  }
}
