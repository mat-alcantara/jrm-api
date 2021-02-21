import bcrypt from 'bcryptjs';
import IHashProvider from '@shared/containers/providers/HashProvider/models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  createHash(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
  }

  checkHash(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
