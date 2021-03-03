import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMaterialService from '@modules/cutlist/services/CreateMaterialService';
import ShowAllMaterialsService from '@modules/cutlist/services/ShowAllMaterialsService';
import DeleteMaterialService from '@modules/cutlist/services/DeleteMaterialService';

export default class MaterialController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showAllMaterialsService = await container.resolve(
      ShowAllMaterialsService,
    );

    const allMaterials = await showAllMaterialsService.execute();

    return response.json(allMaterials);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const materialData = request.body;

    const createMaterialService = await container.resolve(
      CreateMaterialService,
    );

    const materialCreated = await createMaterialService.execute(materialData);

    return response.json(materialCreated);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMaterialService = container.resolve(DeleteMaterialService);

    await deleteMaterialService.execute(id);

    return response.json();
  }
}
