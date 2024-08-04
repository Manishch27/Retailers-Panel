import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import { error } from 'console';
import userRouter from './user/user.router.js';
import applicationRouter from './application/application.router.js';

const app = express();

//  Routes

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use("/api/v1/applications", applicationRouter);





// Global error handler

app.use(globalErrorHandler);

export default app;