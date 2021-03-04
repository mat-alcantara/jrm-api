import { container } from 'tsyringe';

import ShowMaterialById from '@modules/materials/services/ShowMaterialByIdService';
import { Request, Response } from 'express';

export default class SpecificMaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showMaterialById = await container.resolve(ShowMaterialById);

    const specificMaterial = await showMaterialById.execute(id);

    return response.json(specificMaterial);
  }
}
