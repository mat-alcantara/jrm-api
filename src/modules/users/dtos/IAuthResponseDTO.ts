import User from '@modules/users/infra/typeorm/entities/User';

export default interface IAuthResponseDTO {
  user: User;
  token: string;
}
