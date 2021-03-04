import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';

import AppError from '@shared/errors/AppError';

let fakeMaterialsRepository: FakeMaterialsRepository;
let createMaterialService: CreateMaterialService;

describe('Create material', () => {
  beforeEach(() => {
    fakeMaterialsRepository = new FakeMaterialsRepository();
    createMaterialService = new CreateMaterialService(fakeMaterialsRepository);
  });

  it('Should create a new material', async () => {
    const materialCreated = await createMaterialService.execute({
      name: 'MDF COMUM',
      thickness: 15,
      width: 2750,
      height: 1850,
    });

    expect(materialCreated).toHaveProperty('id');
  });

  it('Should not create a new material if it already exist', async () => {
    await createMaterialService.execute({
      name: 'MDF COMUM',
      thickness: 15,
      width: 2750,
      height: 1850,
    });

    await expect(
      createMaterialService.execute({
        name: 'MDF COMUM',
        thickness: 15,
        width: 2750,
        height: 1850,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
