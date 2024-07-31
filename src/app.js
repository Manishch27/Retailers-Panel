import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import { error } from 'console';
import userRouter from './user/user.router.js';

const app = express();

app.use(express.json());

//  Routes

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1/users', userRouter);

// Global error handler

app.use(globalErrorHandler);

export default app;