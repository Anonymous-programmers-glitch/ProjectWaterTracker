import Joi from 'joi';

export const userNormaHistorySchema = Joi.object({
  date: Joi.date().iso().messages({
    'date.iso':
      'The date must be in ISO format (e.g., 2024-12-11T14:48:00.000Z).',
    'date.base': '"date" field is required.',
  }),
  dailyNorma: Joi.number().integer().default(2000).min(1).max(15000).messages({
    'number.base': '"currentDailyNorm" must be a number.',
    'number.min': 'Daily norm must be at least 1.',
    'number.max': 'Daily norm must be at most 15000.',
  }),
});
