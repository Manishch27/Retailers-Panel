import express from 'express';
import { createUser } from './user.controller.js';
import { loginUser } from './user.controller.js';


const userRouter = express.Router();

// routes

userRouter.post('/register', createUser);

userRouter.post('/login', loginUser);


export default userRouter;