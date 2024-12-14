import { Router } from 'express';
import authRouter from './auth.js';
import userRoutes from './userRoutes.js';
import waterRouter from './water.js';
import greetingsRouter from './greetings.js';

const router = Router();

router.use('/', greetingsRouter);

router.use('/auth', authRouter);

router.use('/users', userRoutes);

router.use('/water', waterRouter);

export default router;
