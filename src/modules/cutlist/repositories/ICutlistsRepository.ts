import ICreateCutlistDTO from '@modules/cutlist/dtos/ICreateCutlistDTO';
import OrderEntity from '@modules/cutlist/infra/typeorm/entities/OrderEntity';

export default interface IMaterialsRepository {
  createCutlist(cutlistData: ICreateCutlistDTO): Promise<OrderEntity>;
  showAllCutlists(): Promise<OrderEntity[]>;
  findCutlistById(id: string): Promise<OrderEntity | undefined>;
  deleteCutlist(cutlist: OrderEntity): Promise<void>;
}
