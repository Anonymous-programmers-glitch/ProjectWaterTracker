import { Router } from 'express';
import authRouter from './auth.js';
import userRoutes from './userRoutes.js';
import waterRouter from './water.js';
import greetingsRouter from './greetings.js';
import userNormaHistoryRouter from './userNormaHistory.js';

const router = Router();

router.use('/', greetingsRouter);

router.use('/auth', authRouter);

router.use('/users', userRoutes);

router.use('/waterToday', waterRouter);

router.use('/userNormaHistory', userNormaHistoryRouter);

export default router;
