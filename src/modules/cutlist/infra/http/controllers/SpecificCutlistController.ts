import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowSpecificCutlistService from '@modules/cutlist/services/ShowSpecificCutlistService';

export default class MaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSpecificCutlistService = await container.resolve(
      ShowSpecificCutlistService,
    );

    const specificCutlist = await showSpecificCutlistService.execute(id);

    return response.json(specificCutlist);
  }
}
