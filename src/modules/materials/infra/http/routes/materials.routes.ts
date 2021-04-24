import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import MaterialController from '@modules/materials/infra/http/controllers/MaterialController';
import SpecificMaterialController from '@modules/materials/infra/http/controllers/SpecificMaterialController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const materialRoutes = Router();

const materialController = new MaterialController();
const specificMaterialController = new SpecificMaterialController();

materialRoutes.use(ensureAuthenticated);

materialRoutes.get('/materials', materialController.show);
materialRoutes.get('/materials/:id', specificMaterialController.show);

materialRoutes.post(
  '/materials',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
      width: Joi.number().integer().required(),
      height: Joi.number().integer().required(),
    }),
  }),
  materialController.create,
);

materialRoutes.delete('/materials/:id', materialController.remove);

materialRoutes.put(
  '/materials/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      thickness: Joi.number().integer(),
      width: Joi.number().integer(),
      height: Joi.number().integer(),
    }),
  }),
  materialController.update,
);

export default materialRoutes;
