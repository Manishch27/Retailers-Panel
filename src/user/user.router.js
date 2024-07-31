import express from 'express';
import { createUser } from './user.controller.js';


const userRouter = express.Router();

// routes

userRouter.post('/register', createUser);


export default userRouter;