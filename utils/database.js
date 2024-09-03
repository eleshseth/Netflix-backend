import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
  path: '../.env',
});

const databaseConnection = () => {
  const mongoURI =
    'mongodb+srv://eleshseth:netflix@cluster0.zpnau.mongodb.net/';
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('mongodb Connected Succesfully');
    })
    .catch((error) => {
      console.log(error);
    });
};

export default databaseConnection;
