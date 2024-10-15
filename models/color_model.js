const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            maxLength:100
        },
        code:{
            type:String,
            maxLength:100
        },
        status:{
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
        //createdAt and updatedAt
    }
)

const Color = mongoose.model("Color", ColorSchema);

module.exports = Color;