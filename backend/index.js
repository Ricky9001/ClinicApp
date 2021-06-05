require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const userRouter = require('./api/users/user.router');
const interviewRouter = require('./api/Interviews/interview.router');

app.use(express.json());
app.use(cors())

app.use('/api/users/', userRouter);
app.use('/api/Interviews/', interviewRouter);


const server = app.listen(port, () => console.log(`Application listening on port ${port}!`))