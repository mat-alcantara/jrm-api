import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';
import ICreateMaterialDTO from '@modules/cutlist/dtos/ICreateMaterialDTO';

export default class MaterialsRepository {
  public async create(data: ICreateMaterialDTO): Promise<MaterialEntity> {}
}
