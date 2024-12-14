import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/uploid.js';
import { userInfoUpdatedSchema } from '../validation/user.js';

import {
  getUserInfo,
  updateUserController,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', ctrlWrapper(getUserInfo));

router.patch(
  '/:id',

  upload.single('avatarUrl'),
  validateBody(userInfoUpdatedSchema),
  ctrlWrapper(updateUserController),
);

export default router;
