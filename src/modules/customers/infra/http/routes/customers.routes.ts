import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const customersRoutes = Router();

const customersController = new CustomersController();

customersRoutes.use(ensureAuthenticated); // Ensure all routes after this will need authentication
customersRoutes.post(
  '/customers',
  // Schema validation for the requisition
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string(),
      telephone: Joi.array().items(Joi.string()),
      area: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    }),
  }),
  customersController.create,
); // Route to create a new customer

export default customersRoutes;
