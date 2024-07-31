import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }, 

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    admin: {
        type: Boolean,
        default: false,
    },

    tokens: {
        type: Number,
        default: 0,
    }

},{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;