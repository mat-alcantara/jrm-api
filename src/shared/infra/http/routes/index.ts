import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import authRoutes from '@modules/users/infra/http/routes/auth.routes';
import customersRoutes from '@modules/customers/infra/http/routes/customers.routes';
import materialsRoutes from '@modules/materials/infra/http/routes/materials.routes';
import ordersRoutes from '@modules/orders/infra/http/routes/orders.routes';

const router = Router();

router.use('/', usersRoutes);
router.use('/', authRoutes);
router.use('/', customersRoutes);
router.use('/', materialsRoutes);
router.use('/', ordersRoutes);

export default router;
