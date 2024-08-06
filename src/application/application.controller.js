import cloudinary from '../config/cloudinary.config.js';
import fs from "node:fs"
import Application from './application.model.js';
import { v4 as uuid } from 'uuid';
 
const createApplication = async (req, res) => {
    const { fullName, fatherName, dateOfBirth, gender, aadhaarNo, mobileNo, emailId, address, postOffice, district, state, status} = req.body;

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
                    fingerprints: fingerprintData,
                    createdBy: req.user._id,
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



        
        
        
        
    }
    
    // Get all the applications from the database

const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate("createdBy");
        console.log(applications);
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};


// get all the applications of the individual retailer

const getRetailerApplications = async (req, res) => {
    const { id } = req.params;
    try {
        const applications = await Application.find({ createdBy: id });
        if (!applications) {
            return res.status(404).json({ error: 'No applications found for this retailer' });
        }
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};


// update the status of the application

const updateApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await Application.findByIdAndUpdate
        (id, { status });
        res.status(200).json({ message: 'Application status updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update application status' });
    }
}


export { createApplication, getAllApplications, getRetailerApplications, updateApplicationStatus };