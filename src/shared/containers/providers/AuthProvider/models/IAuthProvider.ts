import ITokenPayload from '@shared/containers/providers/AuthProvider/dtos/ITokenPayload';

export default interface IAuthProvider {
  generateToken(id: string): Promise<string>;
  verifyToken(token: string): Promise<ITokenPayload>;
}
