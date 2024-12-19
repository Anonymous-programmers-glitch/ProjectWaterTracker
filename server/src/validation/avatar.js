import Joi from 'joi';

export const userAvatarUpdatedSchema = Joi.object({
  avatarUrl: Joi.string().uri().allow('').default('').messages({
    'string.base': 'Avatar URL must be a string.',
    'string.uri': 'Avatar URL must be a valid URI.',
  }),
});
