import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/User.js';

export const getUserById = async (userId) => {
  const user = await UserCollection.findById({ _id: userId });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};

export const updateUserInfo = async (userId, updates) => {
  return await UserCollection.findByIdAndUpdate(userId, updates, { new: true });
};
