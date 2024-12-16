import createHttpError from 'http-errors';
import * as waterServices from '../services/water.js';

// export const getAllWaterController = async (req, res, next) => {
//   const { _id: userId } = req.user;

//   const waterRecords = await waterServices.getAllWater(userId);

//   res.json({
//     status: 200,
//     message: 'Successfully found water records',
//     waterRecords,
//   });
// };

export const getWaterByDateController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const currentDailyNorm = req.user.dailyNorm;
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

  const percentage = Math.round((totalDayWater / currentDailyNorm) * 100);
  res.json({
    status: 200,
    message: `Successfully found water records by this date ${date}`,
    data: {
      waterRecords,
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
    message: 'Successfully created a water record',
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
    message: 'Successfully updated a water record',
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

  res.status(204).send({ message: 'Water record is deleted successfully' });
};
