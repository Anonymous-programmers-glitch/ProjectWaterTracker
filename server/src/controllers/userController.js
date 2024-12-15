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
    const { id } = req.params;
    const updates = { ...req.body };

    if (req.file) {
      const avatarUrl = await saveFileToCloudinary(req.file);
      updates.avatarUrl = avatarUrl;
    }

    const updatedUser = await updateUserInfo(id, updates);

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.json({
      status: 200,
      message: 'User information updated successfully',
      data: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};
