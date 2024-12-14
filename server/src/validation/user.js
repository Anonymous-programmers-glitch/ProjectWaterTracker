import Joi from 'joi';

import { emailRegexp } from '../constants/user.js';

export const userInfoUpdatedSchema = Joi.object({
  name: Joi.string().max(12),
  email: Joi.string().pattern(emailRegexp).messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email must not be empty.',
    'string.pattern.base': "Email must be in the format 'example@example.com'.",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password must not be empty.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must be at most 64 characters long.',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*).',
    }),
  gender: Joi.string().valid('man', 'woman').default('woman').messages({
    'string.base': 'Gender must be a string.',
    'any.only':
      'Gender must be one of the following values: man, woman, other.',
  }),
  dailyNorm: Joi.number().min(50).max(5000).default(2000).messages({
    'number.base': 'Daily norm must be a number.',
    'number.min': 'Daily norm must be at least 50.',
    'number.max': 'Daily norm must be at most 5000.',
  }),
  avatarUrl: Joi.string().uri().allow(null).default(null).messages({
    'string.base': 'Avatar URL must be a string.',
    'string.uri': 'Avatar URL must be a valid URI.',
  }),
});
