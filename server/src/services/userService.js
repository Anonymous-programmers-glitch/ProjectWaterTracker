import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/User.js';

export const findUser = (filter) => UserCollection.findOne(filter);

export const updateUserInfo = async ({ _id, payload }) => {
  const user = await findUser({ _id });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  const data = { ...payload };

  if (data.outdatedPassword && data.newPassword) {
    const isEqual = await bcrypt.compare(data.outdatedPassword, user.password);
    if (!isEqual) {
      throw createHttpError(401, 'Password invalid!');
    }
    const encryptedPassword = await bcrypt.hash(data.newPassword, 10);
    await UserCollection.findOneAndUpdate(
      { _id },
      { password: encryptedPassword },
      {
        new: true,
      },
    );

    delete data.outdatedPassword;
    delete data.newPassword;
  }

  const rawResult = await UserCollection.findOneAndUpdate(
    { _id },
    { $set: data },
    { includeResultMetadata: true },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    user: rawResult.value,
  };
};

export const updateUserAvatarUrl = async ({ _id, avatarUrl }) => {
  return await UserCollection.findByIdAndUpdate(
    _id,
    { avatarUrl },
    { new: true },
  );
};
