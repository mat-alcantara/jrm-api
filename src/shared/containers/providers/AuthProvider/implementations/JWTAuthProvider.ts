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
      // Verify is the token if valid
      const decoded = verify(token, authConfig.secret);

      // Return the response from jwt.verify forcing the format as ITokenPayload
      return decoded as ITokenPayload;
    } catch {
      // Throw a new AppError if jwt.verify returns error
      throw new AppError('Token does not match', 401);
    }
  }
}
