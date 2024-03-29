import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrderController from '@modules/orders/infra/http/controllers/OrderController';
import SpecificOrderController from '@modules/orders/infra/http/controllers/SpecificOrderController';
import CutlistController from '@modules/orders/infra/http/controllers/CutlistController';
import PDFController from '@modules/orders/infra/http/controllers/PDFController';
import DeliveryDateController from '@modules/orders/infra/http/controllers/DeliveryDateController';

import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';
import DeliveryTypeEnumDTO from '@modules/orders/dtos/DeliveryTypeEnumDTO';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cutlistRoutes = Router();
const orderController = new OrderController();
const specificOrderController = new SpecificOrderController();
const cutlistController = new CutlistController();
const pdfController = new PDFController();
const deliveryDateController = new DeliveryDateController();

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
      delivery_type: Joi.string()
        .required()
        .valid(DeliveryTypeEnumDTO.ENTREGA, DeliveryTypeEnumDTO.LOJA),
      ps: Joi.string(),
      seller: Joi.string().required(),
      relatedProblems: Joi.string(),
      conclusionDate: Joi.date(),
      cutlist: Joi.array().items(
        Joi.object().keys({
          material_id: Joi.string().required(),
          quantidade: Joi.number().integer().required(),
          side_a_size: Joi.number().integer().required(),
          side_b_size: Joi.number().integer().required(),
          side_a_border: Joi.number().integer().required().valid(0, 1, 2),
          side_b_border: Joi.number().integer().required().valid(0, 1, 2),
          price: Joi.number().required(),
        }),
      ),
    }),
  }),
  orderController.create,
);
cutlistRoutes.delete('/orders/:id', orderController.remove);
cutlistRoutes.put(
  '/orders/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.string(),
      paymentStatus: Joi.string().valid(
        PaymentStatusEnumDTO.PAGO,
        PaymentStatusEnumDTO.PARCIAL,
        PaymentStatusEnumDTO.RECEBER,
      ),
      orderStatus: Joi.string().valid(
        OrderStatusEnumDTO.ENTREGUE,
        OrderStatusEnumDTO.LIBERADO,
        OrderStatusEnumDTO.PRODUCAO,
        OrderStatusEnumDTO.TRANSPORTADO,
        OrderStatusEnumDTO.ORCAMENTO,
      ),
      orderStore: Joi.string().valid(
        OrderStoreEnumDTO.FRADE,
        OrderStoreEnumDTO.JAPUIBA,
        OrderStoreEnumDTO.SAO_JOAO,
      ),
      delivery_type: Joi.string().valid(
        DeliveryTypeEnumDTO.ENTREGA,
        DeliveryTypeEnumDTO.LOJA,
      ),
      ps: Joi.string(),
      seller: Joi.string(),
      relatedProblems: Joi.string(),
      conclusionDate: Joi.date(),
      price: Joi.number(),
    }),
  }),
  orderController.update,
);

// Cutlists
cutlistRoutes.delete('/cutlists/:id', cutlistController.remove);
cutlistRoutes.put(
  '/cutlists/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cutlistId: Joi.string(),
      cutlistData: Joi.object().keys({
        quantidade: Joi.number().integer(),
        material_id: Joi.string(),
        side_a_size: Joi.number().integer(),
        side_b_size: Joi.number().integer(),
        side_a_border: Joi.number().integer().valid(0, 1, 2),
        side_b_border: Joi.number().integer().valid(0, 1, 2),
        price: Joi.number(),
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
      material_id: Joi.string().required(),
      side_a_size: Joi.number().integer().required(),
      side_b_size: Joi.number().integer().required(),
      side_a_border: Joi.number().integer().required().valid(0, 1, 2),
      side_b_border: Joi.number().integer().required().valid(0, 1, 2),
      price: Joi.number().required(),
    }),
  }),
  cutlistController.create,
);

// PDF
cutlistRoutes.post('/orderpdf/:id', pdfController.create);

// Delivery Date
cutlistRoutes.put(
  '/delivery/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      deliveryDate: Joi.date(),
    }),
  }),
  deliveryDateController.update,
);

export default cutlistRoutes;
