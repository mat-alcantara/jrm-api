import IHashProvider from '@shared/containers/providers/HashProvider/models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async createHash(password: string): Promise<string> {
    return password;
  }

  public async checkHash(password: string, hashed: string): Promise<boolean> {
    return password === hashed;
  }
}
