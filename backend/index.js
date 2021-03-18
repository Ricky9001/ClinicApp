require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const userRouter = require('./api/users/user.router');
const conRecordRouter = require('./api/ConRecords/conRecord.router');

app.use(express.json());
app.use(cors())

app.use('/api/users/', userRouter);
app.use('/api/conrecords/', conRecordRouter);


const server = app.listen(port, () => console.log(`Application listening on port ${port}!`))