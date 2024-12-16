import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const userNormHistorySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    dailyNorma: {
      type: Number,
      default: 2000,
    },
  },
  { timestamps: true, versionKey: false },
);

userNormHistorySchema.post('save', handleSaveError);
userNormHistorySchema.pre('findOneAndUpdate', setUpdateSettings);
userNormHistorySchema.post('findOneAndUpdate', handleSaveError);
export const userNormHistoryCollection = model(
  'userNormHistory',
  userNormHistorySchema,
);
