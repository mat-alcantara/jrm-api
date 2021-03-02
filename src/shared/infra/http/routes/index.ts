import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import authRoutes from '@modules/users/infra/http/routes/auth.routes';
import customersRoutes from '@modules/customers/infra/http/routes/customers.routes';
import materialsRoutes from '@modules/cutlist/infra/http/routes/materials.routes';
import cutlistsRoutes from '@modules/cutlist/infra/http/routes/cutlists.routes';

const router = Router();

router.use('/', usersRoutes);
router.use('/', authRoutes);
router.use('/', customersRoutes);
router.use('/', materialsRoutes);
router.use('/', cutlistsRoutes);

export default router;
