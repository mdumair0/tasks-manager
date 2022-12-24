const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is UP !!');
})

// const bcyp = require('bcryptjs')

// const myFunct = async () => {
//     const pass = '123456!'
//     const hashed = await bcyp.hash(pass, 8)

//     console.log(pass);
//     console.log(hashed);

//     const isMatch = await bcyp.compare('123456!', hashed)
//     console.log(isMatch);
// }


const jwt = require('jsonwebtoken')

const myFunc = async () => {
    const token = jwt.sign({_id:"123e"}, 'thisworks', { expiresIn: '5 seconds' })   
}

myFunc()

