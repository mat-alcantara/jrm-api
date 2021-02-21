export default interface IHashProvider {
  createHash(password: string): Promise<string>; // Created a new hashed string
  checkHash(password: string, hashed: string): Promise<boolean>; // Check if string is the same as the hashed string
}
