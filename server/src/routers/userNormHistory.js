import { validateBody } from '../middlewares/validateBody.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { userNormHistoryController } from '../controllers/userNormHistory.js';
import { userNormaHistorySchema } from '../validation/userNormaHistory.js';

const router = Router();

router.put(
  '/',
  ctrlWrapper(userNormHistoryController),
  validateBody(userNormaHistorySchema),
);

export default router;
