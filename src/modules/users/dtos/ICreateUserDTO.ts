export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  userType: 'sell' | 'production';
}
