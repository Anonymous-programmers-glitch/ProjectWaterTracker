import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { typeList } from '../../constants/user.js';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 8, maxlength: 64, required: true },
    verify: { type: Boolean, default: false, required: true },
    name: { type: String, maxlength: 32, required: false },
    gender: { type: String, enum: typeList, required: true, default: 'female' },
    dailyNorma: {
      type: Number,
      required: false,
      min: 1,
      max: 15000,
      default: 2000,
    },
    avatarUrl: { type: String, required: false, default: '' },
  },
  { timestamps: true, versionKey: false },
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', handleSaveError);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('user', userSchema);
