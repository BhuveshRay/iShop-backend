const mongoose = require ('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 100,
            required: true
        },
        slug: {
            type: String,
            maxLength: 100,
            required: true
        },
        original_price: {
            type: Number,
            min: 1
        },
        discount_percent: {
            type: Number,
            min : 0,
            max : 99
        },
        final_price: {
            type: Number,
        },
        image: {
            type: String,
            required: true
        },
        status:{
            type: Boolean,
            default: true
        },
        other_images:[
            { type: String }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        color: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Color",
                required: true
            }
        ]
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;