import ICreateMaterialDTO from '@modules/cutlist/dtos/ICreateMaterialDTO';
import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';

export default interface IMaterialsRepository {
  create(data: ICreateMaterialDTO): Promise<MaterialEntity>;
}
