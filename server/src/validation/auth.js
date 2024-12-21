import Joi from 'joi';
import { emailRegexp } from '../constants/user.js';

export const signupUserSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegexp).required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email must not be empty.',
    'string.pattern.base': "Email must be in the format 'example@example.com'.",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password must not be empty.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must be at most 64 characters long.',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*).',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegexp).required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email must not be empty.',
    'string.pattern.base': "Email must be in the format 'example@example.com'.",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password must not be empty.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must be at most 64 characters long.',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*).',
    }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegexp).required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email must not be empty.',
    'string.pattern.base': "Email must be in the format 'example@example.com'.",
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password must not be empty.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must be at most 64 characters long.',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*).',
    }),
  token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
