import ICreateOrderDTO from '@modules/cutlist/dtos/ICreateOrderDTO';
import OrderEntity from '@modules/cutlist/infra/typeorm/entities/OrderEntity';

export default interface IMaterialsRepository {
  createCutlist(cutlistData: ICreateOrderDTO): Promise<OrderEntity>;
  showAllCutlists(): Promise<OrderEntity[]>;
  findCutlistById(id: string): Promise<OrderEntity | undefined>;
  deleteCutlist(cutlist: OrderEntity): Promise<void>;
}
