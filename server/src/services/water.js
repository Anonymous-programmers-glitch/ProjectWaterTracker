import WaterCollection from '../db/models/Water.js';

// export const getAllWater = async (userId) => {
//   return await WaterCollection.find({ userId });
// };

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

export const getWaterConsumptionByMonth = async (
  userId,
  month,
  year,
  userHistoryRecords,
  defaultDailyNorma,
) => {
  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

  const records = await WaterCollection.find({
    userId,
    date: { $gte: startDate, $lt: endDate },
  })
    .sort({ date: 1 })
    .select('date amount');

  const daysInMonth = new Date(year, month, 0).getDate();
  const fullMonthData = [];

  // Ініціалізація останньої доступної норми (початково — стандартна)
  let lastDailyNorma = defaultDailyNorma;

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

    // Знаходимо норму для конкретного дня
    const dailyNormaRecord = userHistoryRecords.find(
      (record) => new Date(record.date).getTime() === currentDate.getTime(),
    );

    // Оновлюємо останню доступну норму, якщо є новий запис в історії
    if (dailyNormaRecord) {
      lastDailyNorma = dailyNormaRecord.dailyNorma;
    }

    const dailyNorma = lastDailyNorma; // Використовуємо останню доступну норму

    const dayRecords = records.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate.getUTCDate() === day;
    });

    const consumedWaterByDay = dayRecords.reduce((total, record) => {
      return total + record.amount;
    }, 0);

    const percentageConsumed =
      dailyNorma > 0 ? Math.round((consumedWaterByDay / dailyNorma) * 100) : 0;

    fullMonthData.push({
      date: `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`,
      dailyNorma: dailyNorma.toString(),
      percentageConsumed: percentageConsumed.toString(),
      entries: dayRecords.length,
      consumedWaterByDay: consumedWaterByDay.toString(),
    });
  }

  return fullMonthData;
};
