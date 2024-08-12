import mongoose from "mongoose";

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

      fingerprints: [
            {
                url: String,
                id: String
            }
        ],

      status: {
            type: String,
            enum: ['pending', 'reject', 'accept'],
            default: 'pending' 
      },

      createdBy: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
      }
      
}, {timestamp : true});

const Application = mongoose.model('Application', applicationSchema);

export default Application;