import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    course: {
        type: String,
        enum: ['MCA', 'BCA', 'BSC'],
        required: true
    },
    avatar: {
        type: String,
        required: true
    }

},
    {
        timestamps: true,
    }
);

export const Employee = mongoose.model('Employee', employeeSchema);
