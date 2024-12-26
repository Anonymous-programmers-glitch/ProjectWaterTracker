import Joi from 'joi';

import { emailRegexp } from '../constants/user.js';

export const userInfoUpdatedSchema = Joi.object({
  name: Joi.string().allow('').max(32),
  email: Joi.string().pattern(emailRegexp).messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email must not be empty.',
    'string.pattern.base': "Email must be in the format 'example@example.com'.",
  }),
  outdatedPassword: Joi.string()
    .allow('')
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
  newPassword: Joi.string()
    .allow('')
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
  gender: Joi.string().valid('male', 'female').default('female').messages({
    'string.base': 'Gender must be a string.',
    'any.only':
      'Gender must be one of the following values: male, female, other.',
  }),
  dailyNorma: Joi.number().min(1).max(15000).default(2000).messages({
    'number.base': 'Daily norm must be a number.',
    'number.min': 'Daily norm must be at least 1.',
    'number.max': 'Daily norm must be at most 15000.',
  }),
});
