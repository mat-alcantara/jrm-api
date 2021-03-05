import ICreateCutlistDTO from '@modules/cutlist/dtos/ICreateCutlistDTO';
import CutlistEntity from '@modules/cutlist/infra/typeorm/entities/CutlistEntity';

export default interface IMaterialsRepository {
  createCutlist(cutlistData: ICreateCutlistDTO): Promise<CutlistEntity>;
  showAllCutlists(): Promise<CutlistEntity[]>;
  findCutlistById(id: string): Promise<CutlistEntity | undefined>;
  deleteCutlist(cutlist: CutlistEntity): Promise<void>;
}
