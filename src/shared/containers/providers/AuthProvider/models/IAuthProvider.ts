export default interface IAuthProvider {
  generateToken(id: string): Promise<string>;
  verifyToken(token: string): Promise<boolean>;
}
