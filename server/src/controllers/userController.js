import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/uploadMiddleware.js';

import { getUserById, updateUserInfo } from '../services/userService.js';

export const getUserInfo = async (req, res, next) => {
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

export const currentUserController = async (req, res, next) => {
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
