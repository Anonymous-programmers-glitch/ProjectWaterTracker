import Joi from 'joi';

import { emailRegexp } from '../constants/user.js';

export const userInfoUpdatedSchema = Joi.object({
  name: Joi.string().max(12),
  email: Joi.string().pattern(emailRegexp).messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email must not be empty.',
    'string.pattern.base': "Email must be in the format 'example@example.com'.",
  }),
});
