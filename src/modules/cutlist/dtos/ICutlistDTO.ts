import MaterialEntity from '@modules/cutlist/infra/typeorm/entities/MaterialEntity';

export default interface ICutlistDTO {
  quantidade: number;
  material: MaterialEntity;
  side_a_size: number;
  side_b_size: number;
  side_a_border: number;
  side_b_border: number;
}
