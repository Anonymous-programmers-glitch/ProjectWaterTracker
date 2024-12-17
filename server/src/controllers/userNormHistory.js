import { upsertUserNormHistory } from '../services/userNormHistory.js';

export const userNormHistoryController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const payload = req.body;

  const result = await upsertUserNormHistory(userId, payload, {
    upsert: true,
  });
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: "Successfully upserted user's history",
    data: result.userHistory,
  });
};
