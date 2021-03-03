import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import MaterialController from '@modules/cutlist/infra/http/controllers/MaterialController';
import SpecificMaterialController from '@modules/cutlist/infra/http/controllers/SpecificMaterialController';

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
      thickness: Joi.number().integer().required(),
      width: Joi.number().integer().required(),
      height: Joi.number().integer().required(),
    }),
  }),
  materialController.create,
);

export default materialRoutes;
