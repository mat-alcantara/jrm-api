import { Router, Request, Response } from 'express';
import UserController from '@modules/users/infra/http/controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';

const routes = Router();
const userController = new UserController();

routes.get('/test', (req: Request, res: Response) => {
  res.send(
    'Se você chegou até essa mensagem, significa que a aplicação JRM está online e funcionando corretamente.',
  );
});

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
