const mongoose = require('mongoose');

// Define the Transaction schema
const transactionSchema = new mongoose.Schema(
    {
    order_id: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Order', 
          required: true
         },
    razorpay_order_id: {
         type: String,
          required: true
         },
    razorpay_payment_id: {
         type: String,
          required: true 
        },
    user_id: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
         required: true },
    amount: {
         type: Number,
         required: true
         },
    payment_status: { type: Boolean}
    // 1: success // 0: failed
},
    {
        timestamps: true
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
