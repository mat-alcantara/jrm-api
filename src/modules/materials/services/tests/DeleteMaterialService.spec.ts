import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';
import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import DeleteMaterialService from '@modules/materials/services/DeleteMaterialService';

import AppError from '@shared/errors/AppError';

let fakeMaterialsRepository: FakeMaterialsRepository;
let createMaterialService: CreateMaterialService;
let deleteMaterialService: DeleteMaterialService;

describe('Delete Material', () => {
  beforeEach(() => {
    fakeMaterialsRepository = new FakeMaterialsRepository();
    createMaterialService = new CreateMaterialService(fakeMaterialsRepository);
    deleteMaterialService = new DeleteMaterialService(fakeMaterialsRepository);
  });

  it('Should remove a material', async () => {
    const spyRemoveById = spyOn(fakeMaterialsRepository, 'removeById');

    const materialCreated = await createMaterialService.execute({
      name: 'MDF COMUM',
      price: 150,
      width: 2750,
      height: 1850,
    });

    await deleteMaterialService.execute(materialCreated.id);

    expect(spyRemoveById).toBeCalledWith(materialCreated.id);
  });

  it("Should not remove a material if it don't exist", async () => {
    await expect(
      deleteMaterialService.execute('wrongId'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
