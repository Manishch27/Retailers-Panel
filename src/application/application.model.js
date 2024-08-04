import mongoose from "mongoose";

const fingerprintSchema = new mongoose.Schema({
      url: {
            type: String,
            required: true
      },

      id: { 
            type: String,
      }
});

const applicationSchema = new mongoose.Schema({
      fullName: { 
            type: String, 
            required: true 
      },

      fatherName: {
             type: String,
            },

      dateOfBirth: {
             type: Date,
             trim: true,
            },

      gender: { 
            type: String,
            trim: true,
      },

      aadhaarNo: {
            type: String, 
            required: true,
            trim: true,
      },

      mobileNo: {
            type: String, 
            required: true,
            trim: true,
      },

      emailId: {
            type: String,
            trim: true, 
      },

      address: {
            type: String,
            trim: true,
      },

      postOffice: {
            type: String,
            trim: true,
      },

      district: { 
            type: String, 
            trim: true,
      },

      state: {
            type: String,
            trim: true,
      },

      fingerprints: [fingerprintSchema],

      status: {
            type: String,
            enum: ['pending', 'rejected', 'success'],
            default: 'pending' 
      },

      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamp : true});

const Application = mongoose.model('Application', applicationSchema);

export default Application;