// eslint-disable-next-line no-shadow
import UserTypes from '@modules/users/dtos/UserTypes';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  userType: UserTypes;
}
