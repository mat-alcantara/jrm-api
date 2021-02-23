export default interface IAuthProvider {
  generateToken(id: string): Promise<string>;
}
