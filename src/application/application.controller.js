import cloudinary from '../config/cloudinary.config.js';
import fs from "node:fs"
import Application from './application.model.js';
import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

const createApplication = async (req, res) => {
    const { fullName, fatherName, dateOfBirth, gender, aadhaarNo, mobileNo, emailId, address, postOffice, district, state, finger1, finger2, finger3, finger4, finger5 } = req.body;

    const files = [finger1, finger2, finger3, finger4, finger5];
    const fingerprintData = [];

    try {
        for (const file of files) {
            if (file) {
                try {
                    // Upload base64 data directly to Cloudinary
                    const result = await cloudinary.uploader.upload(file, { folder: 'fingerprints' });
                    console.log(result.secure_url);

                    const fingerprint = {
                        url: result.secure_url,
                        id: uuid()
                    };

                    fingerprintData.push(fingerprint);
                } catch (uploadError) {
                    console.error('Error uploading file to Cloudinary:', uploadError);
                    return res.status(500).json({ message: 'Error uploading file to Cloudinary', error: uploadError.message });
                }
            }
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
            console.log('Application saved successfully:', application);

            return res.status(201).json({ message: 'Application submitted successfully' });
        } catch (dbError) {
            console.error('Error saving data into the database:', dbError);
            return res.status(500).json({ message: 'Error saving data into the database', error: dbError.message });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Unexpected error occurred', error: error.message });
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
        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("invalidId");
        }

        // Update the application status
        const updatedApplication = await Application.findByIdAndUpdate(
            id, 
            { status },
            { new: true } // Return the updated document
        );

        // Check if the application was found and updated
        if (!updatedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.status(200).json({ message: 'Application status updated successfully', updatedApplication });
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ error: 'Failed to update application status' });
    }
}

// Delete the application assinged to the retailer

const deleteApplication = async (req, res) => {
    const { id } = req.params;
    try {
        await Application.findByIdAndDelete(id);
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete application' });
    }
}


export { createApplication, getAllApplications, getRetailerApplications, updateApplicationStatus, deleteApplication };