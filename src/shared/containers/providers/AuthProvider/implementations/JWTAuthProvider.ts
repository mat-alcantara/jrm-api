import IAuthProvider from '@shared/containers/providers/AuthProvider/models/IAuthProvider';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/authConfig';

export default class JWTAuthProvider implements IAuthProvider {
  public async generateToken(id: string): Promise<string> {
    // Create a new valid token with id and userType as payloads
    const token = sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return token;
  }
}
