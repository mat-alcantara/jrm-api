import IAuthProvider from '@shared/containers/providers/AuthProvider/models/IAuthProvider';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '@config/authConfig';
import AppError from '@shared/errors/AppError';
import ITokenPayload from '@shared/containers/providers/AuthProvider/dtos/ITokenPayload';

export default class JWTAuthProvider implements IAuthProvider {
  public async generateToken(id: string): Promise<string> {
    // Create a new valid token with id and userType as payloads
    const token = sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return token;
  }

  public verifyToken(token: string): ITokenPayload {
    try {
      const decoded = verify(token, authConfig.secret);

      return decoded as ITokenPayload;
    } catch {
      throw new AppError('Token does not match');
    }
  }
}
