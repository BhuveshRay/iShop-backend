const mongoose = require('mongoose');
const { Schema } = mongoose;

//Define a schema for ProductDetail 
const ProductDetailSchema = new Schema({
  productId: { type:Schema.Types.ObjectId, ref: 'Product', required: true },
  name:{type:String, require: true},
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true }
},{_id: false});

// ShippingDetail Schema
const ShippingDetailSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true }
},{_id: false});

// define the main order schema
const OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product_details:{type:[ProductDetailSchema], required: true},
    order_total: { type: Number, required: true },
    processing_fee: { type: Number, required: true },
    payment_mode: { type: Boolean, required: true }, // 0 for online, 1 for COD
    razorpay_order_id: { type: String, default: null},
    razorpay_payment_id: { type: String, default: null },
    order_status: {
         type: Number, 
         enum: [0, 1, 2, 3, 4, 5, 6, 7],
          default: 0}, // Assuming 0 to 7 are different status codes
          //0 - Order place, 1 - payment done
    shipping_details: { type: ShippingDetailSchema, required: true }
  }, { timestamps: true});


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order ;
  
