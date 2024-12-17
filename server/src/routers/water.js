import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as waterControllers from '../controllers/water.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { waterAddSchema, waterUpdateSchema } from '../validation/water.js';
import { Router } from 'express';

const router = Router();

router.use(authenticate);

// router.get('/', ctrlWrapper(waterControllers.getAllWaterController));

router.get(
  '/day/:date',
  ctrlWrapper(waterControllers.getWaterByDateController),
);

router.post(
  '/',
  validateBody(waterAddSchema),
  ctrlWrapper(waterControllers.addWaterController),
);

router.patch(
  '/:id',
  isValidId,
  validateBody(waterUpdateSchema),
  ctrlWrapper(waterControllers.updateWaterController),
);

router.delete(
  '/:id',
  isValidId,
  ctrlWrapper(waterControllers.deleteWaterController),
);

router.get(
  '/:month/:year',
  ctrlWrapper(waterControllers.getWaterByMonthController),
);

export default router;
