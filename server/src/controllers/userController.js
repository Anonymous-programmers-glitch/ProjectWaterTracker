import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/uploadMiddleware.js';

import {
  updateUserInfo,
  updateUserAvatarUrl,
} from '../services/userService.js';

export const currentUserController = async (req, res) => {
  const user = req.user;
  const { _id: id, email, gender, dailyNorma, avatarUrl, name } = user;

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user: {
        id,
        name,
        email,
        gender,
        dailyNorma,
        avatarUrl,
      },
    },
  });
};

export const updateUserController = async (req, res, next) => {
  const { _id } = req.user;
  const payload = { ...req.body };

  const result = await updateUserInfo({ _id, payload });
  const { _id: id, email, gender, dailyNorma, avatarUrl, name } = result.user;

  res.json({
    status: 200,
    message: 'User information updated successfully',
    data: {
      user: { id, name, email, gender, dailyNorma, avatarUrl },
    },
  });
};

export const updateUserAvatarController = async (req, res, next) => {
  const photo = req.file;

  if (!photo) {
    return next(createHttpError(400, 'Avatar file is required'));
  }

  const avatarUrl = await saveFileToCloudinary(photo);

  const { _id } = req.user;

  const updatedUser = await updateUserAvatarUrl({ _id, avatarUrl });

  if (!updatedUser) {
    return next(createHttpError(404, 'User not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully updated user avatar',
    data: {
      avatarUrl: updatedUser.avatarUrl,
    },
  });
};
