import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      min: 1,
      max: 5000,
      required: true,
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

const WaterCollection = model('waterToday', waterSchema);

export default WaterCollection;
