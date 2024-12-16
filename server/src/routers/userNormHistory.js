import { validateBody } from '../middlewares/validateBody.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.put('/userNormHistory');

export default router;
