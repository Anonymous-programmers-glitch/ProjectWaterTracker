import Joi from 'joi';

export const userNormaHistorySchema = Joi.object({
  date: Joi.date().iso().messages({
    'date.iso':
      'The date must be in ISO format (e.g., 2024-12-11T14:48:00.000Z).',
    'date.base': '"date" field is required.',
  }),
  dailyNorma: Joi.number().integer().default(2000).min(500).messages({
    'number.base': '"currentDailyNorm" must be a number.',
    'number.min': 'The daily norm must be at least 1 ml.',
  }),
});
