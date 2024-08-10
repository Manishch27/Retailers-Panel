import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRouter from './user/user.router.js';
import applicationRouter from './application/application.router.js';
import cors from 'cors';
import path from 'path';

const app = express();

// Configure CORS to allow requests from specific origins
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define API routes
app.use('/api/v1/users', userRouter);
app.use("/api/v1/applications", applicationRouter);

// Serve static files and handle other routes for production
if (process.env.NODE_ENV === 'production') {
    const dirpath = path.resolve('..');
    const frontendDistPath = path.join(dirpath, 'Frontend', 'dist');

    console.log('Serving static files from:', frontendDistPath);

    app.use(express.static(frontendDistPath));

    // Handle all other routes by serving index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendDistPath, 'index.html'));
    });
}

// Define a default route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Global error handler
app.use(globalErrorHandler);

export default app;