import { container } from 'tsyringe';

import CreateMaterialService from '@modules/cutlist/services/CreateMaterialService';
import { Request, Response } from 'express';

export default class MaterialController {
  public async create(request: Request, response: Response): Promise<Response> {
    const materialData = request.body;

    const createMaterialService = await container.resolve(
      CreateMaterialService,
    );

    const materialCreated = await createMaterialService.execute(materialData);

    return response.json(materialCreated);
  }
}
