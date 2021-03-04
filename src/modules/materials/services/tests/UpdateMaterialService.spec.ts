import CreateMaterialService from '@modules/cutlist/services/CreateMaterialService';
import UpdateMaterialService from '@modules/cutlist/services/UpdateMaterialService';
import FakeMaterialsRepository from '@modules/cutlist/repositories/fakes/FakeMaterialsRepository';

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
      thickness: 15,
      width: 2750,
      height: 1850,
    });

    const materialUpdated = await updateMaterialService.execute(
      materialCreated.id,
      {
        thickness: 30,
      },
    );

    await expect(materialUpdated.id).toEqual(materialCreated.id);
  });

  it('Should not update a material if it does not exist', async () => {
    await expect(
      updateMaterialService.execute('wrongId', {
        thickness: 30,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
