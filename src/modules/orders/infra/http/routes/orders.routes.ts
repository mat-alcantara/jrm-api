import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrderController from '@modules/orders/infra/http/controllers/OrderController';
import SpecificOrderController from '@modules/orders/infra/http/controllers/SpecificOrderController';
import CutlistController from '@modules/orders/infra/http/controllers/CutlistController';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cutlistRoutes = Router();
const orderController = new OrderController();
const specificOrderController = new SpecificOrderController();
const cutlistController = new CutlistController();

cutlistRoutes.use(ensureAuthenticated);

// Orders
cutlistRoutes.get('/orders', orderController.show);
cutlistRoutes.get('/orders/:id', specificOrderController.show);
cutlistRoutes.post(
  '/orders',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.string().required(),
      paymentStatus: Joi.string()
        .required()
        .valid(
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
          OrderStatusEnumDTO.ORCAMENTO,
        ),
      orderStore: Joi.string()
        .required()
        .valid(
          OrderStoreEnumDTO.FRADE,
          OrderStoreEnumDTO.JAPUIBA,
          OrderStoreEnumDTO.SAO_JOAO,
        ),
      ps: Joi.string(),
      seller: Joi.string().required(),
      relatedProblems: Joi.string(),
      conclusionDate: Joi.date(),
      price: Joi.number(),
      cutlist: Joi.array().items(
        Joi.object().keys({
          material_id: Joi.string().required(),
          quantidade: Joi.number().integer().required(),
          side_a_size: Joi.number().integer().required(),
          side_b_size: Joi.number().integer().required(),
          side_a_border: Joi.number().integer().required().valid(0, 1, 2),
          side_b_border: Joi.number().integer().required().valid(0, 1, 2),
        }),
      ),
    }),
  }),
  orderController.create,
);
cutlistRoutes.delete('/orders/:id', orderController.remove);

// Cutlists
cutlistRoutes.delete('/cutlists/:id', cutlistController.remove);
cutlistRoutes.put(
  '/cutlists/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cutlistId: Joi.string(),
      cutlistData: Joi.object().keys({
        quantidade: Joi.number().integer(),
        material: Joi.string(),
        side_a_size: Joi.number().integer(),
        side_b_size: Joi.number().integer(),
        side_a_border: Joi.number().integer().valid(0, 1, 2),
        side_b_border: Joi.number().integer().valid(0, 1, 2),
      }),
    }),
  }),
  cutlistController.update,
);
cutlistRoutes.post(
  '/cutlists/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      quantidade: Joi.number().integer().required(),
      material: Joi.string().required(),
      side_a_size: Joi.number().integer().required(),
      side_b_size: Joi.number().integer().required(),
      side_a_border: Joi.number().integer().required().valid(0, 1, 2),
      side_b_border: Joi.number().integer().required().valid(0, 1, 2),
    }),
  }),
  cutlistController.create,
);

export default cutlistRoutes;
