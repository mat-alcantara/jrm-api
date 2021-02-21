import bcrypt from 'bcryptjs';
import IHashProvider from '@shared/containers/providers/HashProvider/models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  createHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // Create a new hashed password and return it
  }

  checkHash(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed); // Check if a password is the same as the hashed password
  }
}
