import ICreateMaterialDTO from '@modules/cutlist/dtos/ICreateMaterialDTO';
import IUpdateMaterialDTO from '@modules/cutlist/dtos/IUpdateMaterialDTO';
import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';

export default interface IMaterialsRepository {
  createMaterial(materialData: ICreateMaterialDTO): Promise<MaterialEntity>;
  findByNameAndThickness(name: string, thickness: number): Promise<boolean>;
  showAllMaterials(): Promise<MaterialEntity[]>;
  findMaterialById(id: string): Promise<MaterialEntity | undefined>;
  removeById(id: string): Promise<void>;
  updateMaterial(
    id: string,
    updateData: IUpdateMaterialDTO,
  ): Promise<MaterialEntity>;
}
