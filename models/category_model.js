const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            maxLength:100
        },
        slug:{
            type:String,
            maxLength:100
        },
        image_name:{
            type: String,  
        },
        status:{
            type: Boolean,
            default: true
        },
        best_seller:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
        //createdAt and updatedAt
    }
)

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;