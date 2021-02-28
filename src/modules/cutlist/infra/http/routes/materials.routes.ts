import { Router } from 'express';
import MaterialController from '@modules/cutlist/infra/http/controllers/MaterialController';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const materialRoutes = Router();
const materialController = new MaterialController();

materialRoutes.use(ensureAuthenticated);

materialRoutes.post(
  '/materials',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      thickness: Joi.number().integer().required(),
      width: Joi.number().integer().required(),
      height: Joi.number().integer().required(),
    }),
  }),
  materialController.create,
);

export default materialRoutes;