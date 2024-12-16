import { userNormaHistoryCollection } from '../db/models/userNormaHistory.js';

export const upsertUserNormaHistory = async (userId, payload, options = {}) => {
  const date = new Date().toISOString().split('T')[0];
  const updatedPayload = { ...payload, date };
  const rawResult = await userNormaHistoryCollection.findOneAndUpdate(
    {
      userId,
      date,
    },
    updatedPayload,
    { includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    userHistory: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};
