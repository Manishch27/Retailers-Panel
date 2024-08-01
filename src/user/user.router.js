import express from 'express';
import { createUser } from './user.controller.js';
import { loginUser } from './user.controller.js';
import {getAllRetailers} from './user.controller.js';
import {updateRetailer} from './user.controller.js';
import {deleteRetailer} from './user.controller.js';
import {addToken} from './user.controller.js';


const userRouter = express.Router();

// routes

userRouter.post('/register', createUser);

userRouter.post('/login', loginUser);

userRouter.get('/', getAllRetailers);

userRouter.put('/:id',updateRetailer);

userRouter.delete('/:id',deleteRetailer);

userRouter.put('/:id/add-token', addToken);


export default userRouter;