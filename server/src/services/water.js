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

export const getWaterConsumptionByMonth = async (
  userId,
  month,
  year,
  dailyNorm,
) => {
  // Визначаємо початок і кінець місяця
  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

  // Отримує записи про споживання води за вказаний місяць і сортує їх за датою у порядку зростання
  const records = await WaterCollection.find({
    userId,
    date: { $gte: startDate, $lt: endDate },
  }).sort({ date: 1 }); // Сортування записів за датою

  // Визначає кількість днів у місяці
  const daysInMonth = new Date(year, month, 0).getDate(); // Останній день місяця для підрахунку кількості днів
  const fullMonthData = []; // Масив для збереження даних про кожен день

  // Проходимо по кожному дню місяця
  for (let day = 1; day <= daysInMonth; day++) {
    // Фільтруємо записи для конкретного дня
    const dayRecords = records.filter((record) => {
      const recordDate = new Date(record.date); // Перетворюємо дату запису
      return recordDate.getUTCDate() === day; // Порівнюємо день запису з поточним днем
    });

    // Підраховуємо загальну кількість спожитої води за день
    const consumedWaterByDay = dayRecords.reduce((total, record) => {
      return total + record.amount; // Сумуємо значення amount для кожного запису
    }, 0);

    // Розраховуємо відсоток від денної норми
    const percentageConsumed =
      dailyNorm > 0
        ? Math.round((consumedWaterByDay / dailyNorm) * 100) // Розрахунок відсотка
        : 0; // Якщо денна норма не задана, повертаємо 0

    // Форматуємо денну норму у літрах
    const formattedDailyNorm = (dailyNorm / 1000).toFixed(1); // Перетворення у літри з точністю до однієї цифри

    // Форматуємо кількість спожитої води у літрах
    const formattedConsumedWater = (consumedWaterByDay / 1000).toFixed(1); // Аналогічне перетворення

    // Додаємо дані за день у масив результатів
    fullMonthData.push({
      date: `${day}, ${new Date(year, month - 1, day).toLocaleString('en-US', {
        month: 'long',
      })}`, // Форматуємо дату як "число, місяць"
      dailyNorm: `${formattedDailyNorm} L`, // Денна норма у літрах
      percentageConsumed: `${percentageConsumed}%`, // Відсоток спожитої води
      entries: dayRecords.length, // Кількість записів за день
      consumedWaterByDay: `${formattedConsumedWater} L`, // Загальна кількість спожитої води за день у літрах
    });
  }

  return fullMonthData;
};
