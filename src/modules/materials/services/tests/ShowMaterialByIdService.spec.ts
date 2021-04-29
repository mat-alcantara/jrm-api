import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';

import AppError from '@shared/errors/AppError';

import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import ShowMaterialById from '@modules/materials/services/ShowMaterialByIdService';

let fakeMaterialsRepository: FakeMaterialsRepository;
let createMaterialService: CreateMaterialService;
let showMaterialById: ShowMaterialById;

describe('Show specific material', () => {
  beforeEach(() => {
    fakeMaterialsRepository = new FakeMaterialsRepository();
    showMaterialById = new ShowMaterialById(fakeMaterialsRepository);
    createMaterialService = new CreateMaterialService(fakeMaterialsRepository);
  });

  it('Should show a specific material', async () => {
    const materialCreated = await createMaterialService.execute({
      name: 'MDF COMUM',
      price: 150,
      width: 2750,
      height: 1850,
    });

    const materialToShow = await showMaterialById.execute(materialCreated.id);

    expect(materialToShow).toEqual(materialCreated);
  });

  it('Should now show a specific material if it not exist', async () => {
    await expect(showMaterialById.execute('wrongId')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
