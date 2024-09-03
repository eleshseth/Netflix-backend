import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {},
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
