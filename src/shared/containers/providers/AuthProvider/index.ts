import { container } from 'tsyringe';
import JWTAuthProvider from './implementations/JWTAuthProvider';
import IAuthProvider from './models/IAuthProvider';

container.registerSingleton<IAuthProvider>('AuthProvider', JWTAuthProvider);
