import path from "node:path";
import express from "express";
import multer from "multer";

const applicationRouter = express.Router();

const upload = multer(
    {
        dest: path.resolve(__dirname, "../../public/data/uploads"),
        limits: {fileSize: 1e7},
    }
);


applicationRouter.post("/", upload.array('fingerprints', 5), createApplication);

export default applicationRouter;