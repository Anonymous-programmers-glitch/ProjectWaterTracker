import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/uploid.js';
import { userInfoUpdatedSchema } from '../validation/user.js';
import { userAvatarUpdatedSchema } from '../validation/avatar.js';

import {
  currentUserController,
  updateUserController,
  updateUserAvatarController,
} from '../controllers/userController.js';

const router = express.Router();

router.use(authenticate);

router.get('/current', authenticate, ctrlWrapper(currentUserController));

router.patch(
  '/',
  validateBody(userInfoUpdatedSchema),
  ctrlWrapper(updateUserController),
);

router.patch(
  '/avatar',
  upload.single('avatarUrl'),
  validateBody(userAvatarUpdatedSchema),
  ctrlWrapper(updateUserAvatarController),
);

export default router;
