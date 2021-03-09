import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrderController from '@modules/orders/infra/http/controllers/OrderController';
import SpecificOrderController from '@modules/orders/infra/http/controllers/SpecificOrderController';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cutlistRoutes = Router();
const orderController = new OrderController();
const specificOrderController = new SpecificOrderController();

cutlistRoutes.use(ensureAuthenticated);

cutlistRoutes.get('/cutlists', orderController.show);
cutlistRoutes.get('/cutlists/:id', specificOrderController.show);
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
cutlistRoutes.delete('/cutlists/:id', orderController.remove);

export default cutlistRoutes;
