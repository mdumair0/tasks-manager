const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is UP !!');
});


// const Task = require('./models/tasks')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('63a816f81025df18d629e5d6')
//     // await task.populate('userId')
//     // console.log(task);

//     const user = await User.findById('63a816c11025df18d629e5d0')
//     await user.populate('tasks')
//     console.log(user.tasks);

// }

// main()
