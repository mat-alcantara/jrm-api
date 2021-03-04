import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import ShowAllMaterialsService from '@modules/materials/services/ShowAllMaterialsService';
import DeleteMaterialService from '@modules/materials/services/DeleteMaterialService';
import UpdateMaterialService from '@modules/materials/services/UpdateMaterialService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const updateData = request.body;
    const { id } = request.params;

    const updateMaterialService = await container.resolve(
      UpdateMaterialService,
    );

    const updatedMaterial = await updateMaterialService.execute(id, updateData);

    return response.json(updatedMaterial);
  }
}
