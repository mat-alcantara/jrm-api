import { Request, Response, NextFunction } from 'express';

import JWTAuthProvider from '@shared/containers/providers/AuthProvider/implementations/JWTAuthProvider';

import AppError from '@shared/errors/AppError';

const authProvider = new JWTAuthProvider();

export default function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Take the bearer token from headers.authorization
  const authHeader = req.headers.authorization;

  // If there's no token, throw a new error
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Split the token from the format 'bearer token' and take the token itself
  const [, token] = authHeader.split(' ');

  // Verify if the token is valid
  const decoded = authProvider.verifyToken(token);

  // Take the user id from the token
  const { sub } = decoded;

  // Store the user id that is logged in req.user.id
  req.user = {
    id: sub,
  };

  return next();
}
