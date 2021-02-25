import IAuthProvider from '@shared/containers/providers/AuthProvider/models/IAuthProvider';
import ITokenPayload from '@shared/containers/providers/AuthProvider/dtos/ITokenPayload';

export default class FakeAuthProvider implements IAuthProvider {
  public async generateToken(id: string): Promise<string> {
    return `fakeTokenWithId${id}`;
  }

  public async verifyToken(token: string): ITokenPayload {
    return {
      iat: 123,
      exp: 123,
      sub: token,
    };
  }
}
