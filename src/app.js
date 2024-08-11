import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRouter from './user/user.router.js';
import applicationRouter from './application/application.router.js';
import cors from 'cors';
import path from 'path';

const app = express();

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define API routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/applications', applicationRouter);

// Serve the frontend
// if(process.env.NODE_ENV === 'production') {
// app.use(express.static(path.join(process.cwd(), 'Frontend', 'dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(process.cwd(), 'Frontend', 'dist', 'index.html'));
// });
// }

if (process.env.NODE_ENV === 'production') {
    const dirpath = path.resolve();
    const frontendDistPath = path.join(dirpath, 'Frontend', 'dist');

    console.log('Serving static files from:', frontendDistPath);

    // Serve static files from the frontend dist directory
    app.use(express.static(frontendDistPath));

    // Serve index.html for all other routes
    app.get('*', (req, res) => {
        if (req.originalUrl.startsWith('/api')) {
            // If the request starts with '/api', pass it to the next handler
            return next();
        }
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