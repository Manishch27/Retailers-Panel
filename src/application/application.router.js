import path from "node:path";
import express from "express";
import multer from "multer";
import { createApplication } from "./application.controller.js";
import { getAllApplications, getRetailerApplications, updateApplicationStatus, deleteApplication, getApplication } from "./application.controller.js";
import { isAuthenticated, isRetailer, isAdmin } from "../middlewares/auth.middleware.js";

const applicationRouter = express.Router();

applicationRouter.use(isAuthenticated);

applicationRouter.post('/', isRetailer, createApplication);
applicationRouter.get('/', isAdmin, getAllApplications);
applicationRouter.get('/retailer/:id', getRetailerApplications);
applicationRouter.put('/:id', isAdmin, updateApplicationStatus);
applicationRouter.delete('/:id', deleteApplication);
applicationRouter.get('/:id', isAdmin, getApplication);

export default applicationRouter;