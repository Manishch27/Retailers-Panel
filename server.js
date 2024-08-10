import app from "./src/app.js";
import dotenv from 'dotenv';
import connectDB from "./src/db/index.js";
import cors from 'cors';
import path from 'path';
import express from 'express';

dotenv.config(
    { path: './.env' }
);

const startServer = async () => {

    await connectDB();

    try {
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port', process.env.PORT);
        });
    } catch (error) {
        console.error(error);
    }
}

startServer();