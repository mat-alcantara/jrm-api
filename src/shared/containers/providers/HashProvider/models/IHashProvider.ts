export default interface IHashProvider {
  createHash(password: string): string; // Created a new hashed string
  checkHash(password: string): boolean; // Check if string is the same as the hashed string
}
