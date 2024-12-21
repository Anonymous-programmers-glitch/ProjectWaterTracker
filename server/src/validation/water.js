import Joi from 'joi';

export const waterAddSchema = Joi.object({
  date: Joi.string().isoDate().required().messages({
    'string.isoDate':
      'The date must be in ISO format (e.g., 2024-12-11T14:48:00.000Z).',
    'string.empty': '"date" field is required.',
  }),
  amount: Joi.number().integer().min(1).max(5000).required().messages({
    'number.base': '"amount" must be a number.',
    'number.min': 'The amount of waterToday must be at least 1 ml.',
    'number.max': 'The amount of waterToday cannot exceed 5,000 ml.',
    'number.empty': '"amount" field is required.',
  }),
});

export const waterUpdateSchema = Joi.object({
  date: Joi.string().isoDate().messages({
    'string.isoDate':
      'The date must be in ISO format (e.g., 2024-12-11T14:48:00.000Z).',
    'string.empty': '"date" field is required.',
  }),
  amount: Joi.number().integer().min(1).max(5000).messages({
    'number.base': '"amount" must be a number.',
    'number.min': 'The amount of waterToday must be at least 1 ml.',
    'number.max': 'The amount of waterToday cannot exceed 5,000 ml.',
    'number.empty': '"amount" field is required.',
  }),
});
