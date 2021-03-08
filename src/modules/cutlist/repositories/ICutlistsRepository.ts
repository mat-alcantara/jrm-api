import ICreateCutlistDTO from '@modules/cutlist/dtos/ICreateCutlistDTO';
import ICutlistDTo from '@modules/cutlist/dtos/ICutlistDTO';
import CutlistEntity from '@modules/cutlist/infra/typeorm/entities/CutlistEntity';

export default interface IMaterialsRepository {
  createCutlist(cutlistData: ICreateCutlistDTO): Promise<CutlistEntity>;
  showAllCutlists(): Promise<CutlistEntity[]>;
  findCutlistById(id: string): Promise<CutlistEntity | undefined>;
  findCutlistPartById(partId: string): Promise<ICutlistDTo | undefined>;
  deleteCutlist(cutlist: CutlistEntity): Promise<void>;
  deletePart(id: string, partId: string): Promise<void>;
}
