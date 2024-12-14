import Joi from 'joi';

export const waterAddSchema = Joi.object({
  date: Joi.string().isoDate().required().messages({
    'string.isoDate':
      'The date must be in ISO format (e.g., 2024-12-11T14:48:00.000Z).',
    'string.empty': '"date" field is required.',
  }),
  amount: Joi.number().integer().min(50).max(5000).required().messages({
    'number.base': '"amount" must be a number.',
    'number.min': 'The amount of water must be at least 50 ml.',
    'number.max': 'The amount of water cannot exceed 5,000 ml.',
    'number.empty': '"amount" field is required.',
  }),
  currentDailyNorm: Joi.number().integer().min(500).messages({
    'number.base': '"currentDailyNorm" must be a number.',
    'number.min': 'The daily norm must be at least 1 ml.',
  }),
});

export const waterUpdateSchema = Joi.object({
  date: Joi.string().isoDate().messages({
    'string.isoDate':
      'The date must be in ISO format (e.g., 2024-12-11T14:48:00.000Z).',
    'string.empty': '"date" field is required.',
  }),
  amount: Joi.number().integer().min(50).max(5000).messages({
    'number.base': '"amount" must be a number.',
    'number.min': 'The amount of water must be at least 50 ml.',
    'number.max': 'The amount of water cannot exceed 5,000 ml.',
    'number.empty': '"amount" field is required.',
  }),
  currentDailyNorm: Joi.number().integer().min(500).messages({
    'number.base': '"currentDailyNorm" must be a number.',
    'number.min': 'The daily norm must be at least 1 ml.',
  }),
});
