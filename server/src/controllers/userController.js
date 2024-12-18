import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/uploadMiddleware.js';

import { getUserById, updateUserInfo } from '../services/userService.js';

export const getUserInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return next(createHttpError(404, 'User not found you'));
    }
    res.json({
      status: 200,
      message: 'User retrieved successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
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
