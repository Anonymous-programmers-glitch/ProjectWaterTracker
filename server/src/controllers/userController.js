import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/uploadMiddleware.js';
// import { UserCollection } from '../db/models/User.js';

import {
  updateUserInfo,
  updateUserAvatarUrl,
} from '../services/userService.js';

export const currentUserController = async (req, res, next) => {
  const user = req.user;

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        dailyNorma: user.dailyNorma,
        avatarUrl: user.avatarUrl,
      },
    },
  });
};

export const updateUserController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = { ...req.body };

    const updatedUser = await updateUserInfo({ _id, data });

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.json({
      status: 200,
      message: 'User information updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAvatarController = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
