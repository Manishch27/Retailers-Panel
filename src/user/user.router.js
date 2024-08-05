import express from 'express';
import { createUser } from './user.controller.js';
import { loginUser } from './user.controller.js';
import { getAllRetailers } from './user.controller.js';
import { updateRetailer } from './user.controller.js';
import { deleteRetailer } from './user.controller.js';
import { addToken } from './user.controller.js';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

// routes

userRouter.post('/register', isAuthenticated, isAdmin, createUser);

userRouter.post('/login', loginUser);

userRouter.get('/', isAuthenticated, isAdmin, getAllRetailers);

userRouter.put('/:id',  isAuthenticated, isAdmin, updateRetailer);

userRouter.delete('/:id',  isAuthenticated, isAdmin, deleteRetailer);

userRouter.put('/:id/add-token',  isAuthenticated, isAdmin, addToken);

export default userRouter;