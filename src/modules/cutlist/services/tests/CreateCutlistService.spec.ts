import CreateMaterialService from '@modules/cutlist/services/CreateMaterialService';
import CreateCutlistService from '@modules/cutlist/services/CreateCutlistService';
import FakeCutlistsRepository from '@modules/cutlist/repositories/fakes/FakeCutlistsRepository';
import FakeMaterialsRepository from '@modules/cutlist/repositories/fakes/FakeMaterialsRepository';

import AppError from '@shared/errors/AppError';

let fakeMaterialsRepository: FakeMaterialsRepository;
let createMaterialService: CreateMaterialService;
let fakeCutlistsRepository: FakeCutlistsRepository;
let createCutlistService: CreateCutlistService;

describe('Create cutlist', () => {
  beforeEach(() => {
    fakeMaterialsRepository = new FakeMaterialsRepository();
    createMaterialService = new CreateMaterialService(fakeMaterialsRepository);
    fakeCutlistsRepository = new FakeCutlistsRepository();
    createCutlistService = new CreateCutlistService(
      fakeCutlistsRepository,
      fakeMaterialsRepository,
    );
  });

  it('Should create a new cutlist', async () => {
    const materialCreated = await createMaterialService.execute({
      name: 'MDF COMUM',
      thickness: 15,
      width: 2750,
      height: 1850,
    });

    expect(materialCreated).toHaveProperty('id');
  });
});
