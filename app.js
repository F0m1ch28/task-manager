import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';

const app = express();

app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

export default app;