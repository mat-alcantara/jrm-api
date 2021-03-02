import { Router } from 'express';
import CutlistController from '@modules/cutlist/infra/http/controllers/CutlistController';
import { celebrate, Segments, Joi } from 'celebrate';

import OrderStatusEnumDTO from '@modules/cutlist/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/cutlist/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/cutlist/dtos/PaymentStatusEnumDTO';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cutlistRoutes = Router();
const cutlistController = new CutlistController();

cutlistRoutes.use(ensureAuthenticated);

cutlistRoutes.post(
  '/cutlists',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.string().required(),
      paymentStatus: Joi.string()
        .required()
        .valid(
          PaymentStatusEnumDTO.ORCAMENTO,
          PaymentStatusEnumDTO.PAGO,
          PaymentStatusEnumDTO.PARCIAL,
          PaymentStatusEnumDTO.RECEBER,
        ),
      orderStatus: Joi.string()
        .required()
        .valid(
          OrderStatusEnumDTO.ENTREGUE,
          OrderStatusEnumDTO.LIBERADO,
          OrderStatusEnumDTO.PRODUCAO,
          OrderStatusEnumDTO.TRANSPORTADO,
        ),
      orderStore: Joi.string()
        .required()
        .valid(
          OrderStoreEnumDTO.FRADE,
          OrderStoreEnumDTO.JAPUIBA,
          OrderStoreEnumDTO.SAO_JOAO,
        ),
      ps: Joi.string(),
      relatedProblems: Joi.string(),
      conclusionDate: Joi.date(),
      price: Joi.number(),
      cutlist: Joi.array().items(
        Joi.object().keys({
          material: Joi.string().required(),
          side_a_size: Joi.number().integer().required(),
          side_b_size: Joi.number().integer().required(),
          side_a_border: Joi.number().integer().required().valid(0, 1, 2),
          side_b_border: Joi.number().integer().required().valid(0, 1, 2),
        }),
      ),
    }),
  }),
  cutlistController.create,
);

export default cutlistRoutes;
