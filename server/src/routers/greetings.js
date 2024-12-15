import { Router } from 'express';
import { getGreetingController } from '../controllers/greetings.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getGreetingController));

export default router;
