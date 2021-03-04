import ShowAllMaterialsService from '@modules/materials/services/ShowAllMaterialsService';
import FakeMaterialsRepository from '@modules/materials/repositories/fakes/FakeMaterialsRepository';
import CreateMaterialService from '@modules/materials/services/CreateMaterialService';

let fakeMaterialsRepository: FakeMaterialsRepository;
let showAllMaterialsService: ShowAllMaterialsService;
let createMaterialService: CreateMaterialService;

describe('Show all materials', () => {
  beforeEach(() => {
    fakeMaterialsRepository = new FakeMaterialsRepository();
    showAllMaterialsService = new ShowAllMaterialsService(
      fakeMaterialsRepository,
    );
    createMaterialService = new CreateMaterialService(fakeMaterialsRepository);
  });

  it('Should show all materials', async () => {
    const firstMaterialCreated = await createMaterialService.execute({
      name: 'MDF COMUM',
      thickness: 15,
      width: 2750,
      height: 1850,
    });

    const secondMaterialCreatedawait = await createMaterialService.execute({
      name: 'MDF Ultra',
      thickness: 15,
      width: 2750,
      height: 1850,
    });

    const allMaterials = await showAllMaterialsService.execute();

    expect(allMaterials).toEqual(
      expect.arrayContaining([
        firstMaterialCreated,
        secondMaterialCreatedawait,
      ]),
    );
  });
});
