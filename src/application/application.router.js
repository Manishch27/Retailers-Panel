import path from "node:path";
import express from "express";
import multer from "multer";
import { createApplication } from "./application.controller.js";
import { getAllApplications, getRetailerApplications, updateApplicationStatus, deleteApplication} from "./application.controller.js";
import { isAuthenticated, isRetailer, isAdmin } from "../middlewares/auth.middleware.js";

const applicationRouter = express.Router();

const upload = multer({ dest: 'uploads/' });

applicationRouter.use(isAuthenticated);

applicationRouter.post('/', isRetailer, upload.array('fingerprints', 5), createApplication);
applicationRouter.get('/', isAdmin, getAllApplications);
applicationRouter.get('/retailer/:id', getRetailerApplications);
applicationRouter.put('/:id', isAdmin, updateApplicationStatus);
applicationRouter.delete('/:id',deleteApplication);

export default applicationRouter;