import { validateBody } from '../middlewares/validateBody.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { userNormaHistoryController } from '../controllers/userNormaHistory.js';
import { userNormaHistorySchema } from '../validation/userNormaHistory.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);
router.put(
  '/',
  ctrlWrapper(userNormaHistoryController),
  validateBody(userNormaHistorySchema),
);

export default router;
