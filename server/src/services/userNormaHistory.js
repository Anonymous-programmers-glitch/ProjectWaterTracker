import { userNormaHistoryCollection } from '../db/models/userNormaHistory.js';

// export const upsertUserNormaHistory = async (userId, payload, options = {}) => {

//   const date = new Date().toISOString().split('T')[0];

//   const updatedPayload = { ...payload, date };

//   const rawResult = await userNormaHistoryCollection.findOneAndUpdate(
//     {
//       userId,
//       date,
//     },
//     updatedPayload,
//     { includeResultMetadata: true, ...options },
//   );

//   if (!rawResult || !rawResult.value) return null;
//   return {
//     userHistory: rawResult.value,
//     isNew: Boolean(rawResult.lastErrorObject.upserted),
//   };
// };

export const upsertUserNormaHistory = async (userId, payload, options = {}) => {
  // Перевіряємо, чи є передана дата
  const date = payload.date
    ? new Date(payload.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  if (isNaN(new Date(date))) {
    throw new Error('Invalid date format. Please provide a valid ISO date.');
  }

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
