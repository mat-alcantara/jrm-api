import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import UpdateMaterialService from '@modules/materials/services/UpdateMaterialService';
import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';

import AppError from '@shared/errors/AppError';

let fakeMaterialsRepository: FakeMaterialsRepository;
let createMaterialService: CreateMaterialService;
let updateMaterialService: UpdateMaterialService;

describe('Update Material', () => {
  beforeEach(() => {
    fakeMaterialsRepository = new FakeMaterialsRepository();
    createMaterialService = new CreateMaterialService(fakeMaterialsRepository);
    updateMaterialService = new UpdateMaterialService(fakeMaterialsRepository);
  });

  it('Should update a material', async () => {
    const materialCreated = await createMaterialService.execute({
      name: 'MDF COMUM',
      price: 150,
      width: 2750,
      height: 1850,
    });

    const materialUpdated = await updateMaterialService.execute(
      materialCreated.id,
      {
        price: 1590,
      },
    );

    await expect(materialUpdated.id).toEqual(materialCreated.id);
  });

  it('Should not update a material if it does not exist', async () => {
    await expect(
      updateMaterialService.execute('wrongId', {
        price: 150,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
