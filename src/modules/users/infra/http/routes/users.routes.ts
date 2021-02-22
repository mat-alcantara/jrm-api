import { Router } from 'express';
import UserController from '@modules/users/infra/http/controllers/UserController';

const routes = Router();
const userController = new UserController();

routes.post('/user', userController.create);

export default routes;
