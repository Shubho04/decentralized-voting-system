import mongoose from 'mongoose';

// Create a schema for the user
const userSchema = new mongoose.Schema({
    aadhaarNumber: {
        type: String,
        required: true,
        unique: true, // Ensure Aadhaar number is unique
    },
    password: {
        type: String,
        required: true,
    },
    // Additional fields can be added here
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
export default User;
