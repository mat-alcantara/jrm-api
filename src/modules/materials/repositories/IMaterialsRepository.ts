import ICreateMaterialDTO from '@modules/materials/dtos/ICreateMaterialDTO';
import IUpdateMaterialDTO from '@modules/materials/dtos/IUpdateMaterialDTO';
import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';

export default interface IMaterialsRepository {
  createMaterial(materialData: ICreateMaterialDTO): Promise<MaterialEntity>;
  findByName(name: string): Promise<boolean>;
  showAllMaterials(): Promise<MaterialEntity[]>;
  findMaterialById(id: string): Promise<MaterialEntity | undefined>;
  removeById(id: string): Promise<void>;
  updateMaterial(
    materialToUpdate: MaterialEntity,
    updateData: IUpdateMaterialDTO,
  ): Promise<MaterialEntity>;
}
