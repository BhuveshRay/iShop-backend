const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    is_super:{
        type: Boolean,
        default:false,
        // true : yes, false: no
    }
},
{
    timestamps: true // add createAt and  updatedAt timestamps
});

// Create the User model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
