import { upsertUserNormaHistory } from '../services/userNormaHistory.js';

export const userNormaHistoryController = async (req, res) => {
  const { _id: userId } = req.user;
  const payload = req.body;

  const result = await upsertUserNormaHistory(userId, payload, {
    upsert: true,
  });
  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: "Successfully upserted user's history",
    data: {
      date: result.userHistory.date,
      dailyNorma: result.userHistory.dailyNorma,
    },
  });
};
