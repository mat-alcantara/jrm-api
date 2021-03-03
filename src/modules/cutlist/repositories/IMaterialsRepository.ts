import ICreateMaterialDTO from '@modules/cutlist/dtos/ICreateMaterialDTO';
import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';

export default interface IMaterialsRepository {
  createMaterial(materialData: ICreateMaterialDTO): Promise<MaterialEntity>;
  findByNameAndThickness(name: string, thickness: number): Promise<boolean>;
  showAllMaterials(): Promise<MaterialEntity[]>;
  showMaterialById(id: string): Promise<MaterialEntity | undefined>;
}
