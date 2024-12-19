// import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/User.js';

export const updateUserInfo = async ({ _id, data }) => {
  return await UserCollection.findByIdAndUpdate(_id, data, { new: true });
};

export const updateUserAvatarUrl = async ({ _id, avatarUrl }) => {
  return await UserCollection.findByIdAndUpdate(
    _id,
    { avatarUrl },
    { new: true },
  );
};
