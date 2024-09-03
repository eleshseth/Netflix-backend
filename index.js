//step  1
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import databaseConnection from './utils/database.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
// const express = require('express');

databaseConnection();

dotenv.config({
  path: '.env',
});
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'hello ia ma coming from backend ',
//     success: true,
//   });
// });

//api creation
app.use('/api/v1/user', userRoute);

const callbackFunction = () => {
  console.log(`server listen at Port ${process.env.PORT}`);
};

app.listen(process.env.PORT, callbackFunction);
