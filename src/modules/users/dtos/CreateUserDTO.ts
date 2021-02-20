export default interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  userType: 'sell' | 'production';
}
