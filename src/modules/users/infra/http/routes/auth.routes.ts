import { Router } from 'express';
import AuthController from '@modules/users/infra/http/controllers/AuthController';

const authController = new AuthController();

const routes = Router();

// Create a new session
routes.post('/session', authController.create);

export default routes;
