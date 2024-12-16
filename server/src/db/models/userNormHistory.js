import { Schema, model } from 'mongoose';

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
    dailyNorm: {
      type: Number,
      default: 2000,
    },
  },
  { timestamps: true, versionKey: false },
);

export const userNormHistoryCollection = model(
  'userNormHistory',
  userNormHistorySchema,
);
