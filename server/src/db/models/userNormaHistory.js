import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const userNormaHistorySchema = new Schema(
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

userNormaHistorySchema.post('save', handleSaveError);
userNormaHistorySchema.pre('findOneAndUpdate', setUpdateSettings);
userNormaHistorySchema.post('findOneAndUpdate', handleSaveError);

export const userNormaHistoryCollection = model(
  'userNormaHistory',
  userNormaHistorySchema,
);
