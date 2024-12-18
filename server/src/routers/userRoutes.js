import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
// import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
// import { upload } from '../middlewares/uploid.js';
import { userInfoUpdatedSchema } from '../validation/user.js';

import {
  currentUserController,
  // getUserInfo,
  updateUserController,
} from '../controllers/userController.js';

const router = express.Router();

router.use(authenticate);
router.get('/current', authenticate, ctrlWrapper(currentUserController));

// router.get('/:id', isValidId, ctrlWrapper(getUserInfo));

// router.patch(
//   '/:id',
//   isValidId,
//   upload.single('avatarUrl'),
//   validateBody(userInfoUpdatedSchema),
//   ctrlWrapper(updateUserController),
// );
router.patch(
  '/',
  validateBody(userInfoUpdatedSchema),
  ctrlWrapper(updateUserController),
);

export default router;
