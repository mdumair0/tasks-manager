const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');

const app = express();

const cors = require('cors');
const corsOptions ={
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app