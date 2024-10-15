const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the address sub-schema
const addressSchema = new Schema({
    address: {type: String},
    city: {type: String},
    state: {type: String},
    pincode: {type: String},
    name:{type: String},
    email:{type: String},
    contact:{type: String}
}, { _id: false });

// Define the user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
     lastName: {
        type: String
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
    contact_number: {
        type: String,
        default: null
    },
    status:{
        type: Boolean,
        default: true
    },
    bio: {
        type: String
      },
      gender: {
        type: Number,
        enum: [1, 2, 3]
      },
      address: {
        type:[addressSchema],
        default:null
      }
},
{
    timestamps: true
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
