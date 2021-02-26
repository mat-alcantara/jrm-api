import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import authRoutes from '@modules/users/infra/http/routes/auth.routes';
import customersRoutes from '@modules/customers/infra/http/routes/customers.routes';

const router = Router();

router.use('/', usersRoutes);
router.use('/', authRoutes);
router.use('/', customersRoutes);

export default router;
