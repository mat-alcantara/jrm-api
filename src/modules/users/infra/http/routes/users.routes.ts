import { Router } from 'express';
import UserController from '@modules/users/infra/http/controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';

const routes = Router();
const userController = new UserController();

routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      userType: Joi.string().valid('sell', 'production'),
    }),
  }),
  userController.create,
);

export default routes;
