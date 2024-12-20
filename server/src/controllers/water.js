import createHttpError from 'http-errors';
import * as waterServices from '../services/water.js';
import { userNormaHistoryCollection } from '../db/models/userNormaHistory.js';
import { UserCollection } from '../db/models/User.js';


export const getWaterByDateController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const currentDailyNorma = req.user.dailyNorma;
  const date = new Date(req.params.date);

  if (isNaN(date.getTime())) {
    throw createHttpError(
      400,
      'Invalid date format. Expected ISO format (YYYY-MM-DD).',
    );
  }

  const userTimezoneOffset = req.user.timezoneOffset || 0;

  const startOfDay = new Date(date);
  startOfDay.setHours(0 - userTimezoneOffset / 60, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23 - userTimezoneOffset / 60, 59, 59, 999);

  const waterRecords = await waterServices.getWaterByDate(
    startOfDay,
    endOfDay,
    userId,
  );

  if (waterRecords.length === 0) {
    throw createHttpError(404, 'No records found for this date');
  }

  const totalDayWater = waterRecords.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  const percentage = Math.round((totalDayWater / currentDailyNorma) * 100);
  res.json({
    status: 200,
    message: `Successfully found water records by this date ${date}`,
    data: {
      waterRecords,
      currentDailyNorma,
      recordsCount: waterRecords.length,
      totalDayWater,
      percentage,
    },
  });
};

export const addWaterController = async (req, res) => {
  const { _id: userId } = req.user;
  const waterRecord = await waterServices.addWater({
    ...req.body,
    userId,
    currentDailyNorm: req.user.dailyNorm,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a waterToday record',
    waterRecord,
  });
};

export const updateWaterController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const result = await waterServices.updateWater({
    _id,
    userId,
    payload: req.body,
  });

  if (!result) {
    throw createHttpError(404, 'Water record is not found');
  }

  res.json({
    status: 200,
    message: 'Successfully updated a waterToday record',
    data: result.data,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const data = await waterServices.deleteWater({ _id, userId });

  if (!data) {
    return next(createHttpError(404, "Water record isn't foudn"));
  }

  // res.status(204).send({ message: 'Water record is deleted successfully' });
  res.json({
    status: 200,
    message: 'Water record is deleted successfully',
    _id,
  });
};

export const getWaterByMonthController = async (req, res) => {
  const { _id: userId } = req.user;
  const { month, year } = req.params;

  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);

  if (
    isNaN(monthInt) ||
    isNaN(yearInt) ||
    monthInt < 1 ||
    monthInt > 12 ||
    yearInt < 1970 ||
    yearInt > 2100
  ) {
    throw createHttpError(400, 'Invalid month or year provided');
  }

  // Знаходимо історичну норму для кожного дня
  const userHistoryRecords = await userNormaHistoryCollection
    .find({ userId })
    .sort({ date: -1 }); // Сортуємо записи в порядку спадання за датою

  // Якщо записів історії немає, беремо стандартну норму з профілю користувача
  const user = await UserCollection.findById(userId);
  const defaultDailyNorma = user?.dailyNorma || 2000;

  // Передаємо всю історію і стандартну норму в сервіс
  const data = await waterServices.getWaterConsumptionByMonth(
    userId,
    monthInt,
    yearInt,
    userHistoryRecords,
    defaultDailyNorma, // Стандартна норма, якщо історія відсутня
  );

  res.status(200).json({
    status: 200,
    data,
  });
};
