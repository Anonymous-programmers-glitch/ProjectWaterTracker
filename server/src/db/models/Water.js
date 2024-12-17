import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';

const waterSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currentDailyNorm: {
      type: Number,
      default: 2000,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

waterSchema.post('save', handleSaveError);

waterSchema.pre('findOneAndUpdate', setUpdateSettings);

waterSchema.post('findOneAndUpdate', handleSaveError);

export const sortByList = ['date'];

const WaterCollection = model('water', waterSchema);

export default WaterCollection;
