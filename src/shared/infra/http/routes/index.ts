import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/users.routes';

const router = Router();

router.use('/', userRoutes);

export default router;
