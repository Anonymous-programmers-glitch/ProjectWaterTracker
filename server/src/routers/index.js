import { Router } from 'express';
import authRouter from './auth.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', userRoutes);

export default router;
