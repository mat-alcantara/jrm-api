import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';
import SpecificCustomerController from '@modules/customers/infra/http/controllers/SpecificCustomerController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const customersRoutes = Router();

const customersController = new CustomersController();
const specificCustomerController = new SpecificCustomerController();

customersRoutes.use(ensureAuthenticated); // Ensure all routes after this will need authentication

customersRoutes.get('/customers', customersController.show); // Show all customers

customersRoutes.get('/customers/:id', specificCustomerController.show); // Show a specific customer

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

customersRoutes.delete(
  '/customers',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  customersController.delete,
); // Route to delete a customer by id

customersRoutes.put('/customers/:id', customersController.update); // Route to update a customer

export default customersRoutes;
