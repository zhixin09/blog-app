const dotenv = require('dotenv').config();

const express = require('express');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

//Connect to database
connectDb();
//Creating an express application
const app = express();
const port = process.env.PORT || 5000;

//Provides an paraser for data recieved from client on the server side
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

app.use(errorHandler);

//Server runs on port 5000, client (React) port 3000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
