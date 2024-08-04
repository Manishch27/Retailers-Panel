import cloudinary from '../config/cloudinary.config.js';
import fs from "node:fs"
import Application from './application.model.js';
import {uuid} from 'uuidv4';
 
const createApplication = async (req, res) => {
    const { fullName, fatherName, dateOfBirth, gender, aadhaarNo, mobileNo, emailId, address, postOffice, district, state} = req.body;

    const files = req.files;

    console.log(req)


    if (files.length !== 5) {
        return res.status(400).json({ message: 'You must provide exactly 5 fingerprint images' });
    }


    // logic to save the files on cloudinary and store the urls in the database

    const fingerprintData = [];


        try {
            for (const file of files) {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'fingerprints' });
                fs.promises.unlink(file.path); // Clean up local file

                console.log(result.secure_url)
                const fingerprint = {
                    url: result.secure_url,
                    id: uuid()
                };

                fingerprintData.push(fingerprint);
            }
                try { 
                const application = new Application({
                    fullName,
                    fatherName,
                    dateOfBirth,
                    gender,
                    aadhaarNo,
                    mobileNo,
                    emailId,
                    address,
                    postOffice,
                    district,
                    state,
                    fingerprints: fingerprintData
                });
            
                await application.save();

                } catch (error) {
                    return res.status(500).json({ message: 'Error in save data into the database', error });    
                }
                
            return res.status(201).json({ message: 'Application submitted successfully' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error in file upload', error });
        }

        // 

}

export { createApplication };