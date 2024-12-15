import WaterCollection from '../db/models/Water.js';

export const getAllWater = async (userId) => {
  return await WaterCollection.find({ userId });
};

export const getWaterByDate = async (startOfDay, endOfDay, userId) => {
  return await WaterCollection.find({
    userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  });
};

export const addWater = (payload) => WaterCollection.create(payload);
// 1 Попили воду 2 записали в базу что попили 3 Переговорить с Николаем обновить данные по проценту попитой воды

// относительно 1 дня
//01 10 2024   1500
//02 10 2024   2000

export const updateWater = async ({ _id, userId, payload, options = {} }) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      ...options,
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteWater = async ({ _id, userId }) => {
  return WaterCollection.findOneAndDelete({ _id, userId });
};
