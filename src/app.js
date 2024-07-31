import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import { error } from 'console';

const app = express();

//  Routes

app.get('/', (req, res) => {
    throw new Error('Something went wrong');
    res.send('Hello World');
});


// Global error handler

app.use(globalErrorHandler);

export default app;