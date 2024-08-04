import path from "node:path";
import express from "express";
import multer from "multer";
import {createApplication} from "./application.controller.js";

const applicationRouter = express.Router();

const upload = multer({ dest: 'uploads/' });



applicationRouter.post('/', upload.array('fingerprints', 5), createApplication);



export default applicationRouter;