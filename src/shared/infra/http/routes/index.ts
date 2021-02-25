import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/users.routes';
import authRoutes from '@modules/users/infra/http/routes/auth.routes';

const router = Router();

router.use('/', userRoutes);
router.use('/', authRoutes);

export default router;
