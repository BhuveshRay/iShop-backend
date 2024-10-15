const Cart = require("../models/cart_model");
const Order = require("../models/order_model");
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Transaction = require("../models/transaction_model");

const instance = new Razorpay({
    key_id: 'rzp_test_ac47SUIUpH7FHG',

    key_secret: 'UQa52f9eLZdP1i9LXioxQtZ8',
});
// const MINIMUM_ORDER_AMOUNT = 100;
class OrderController {

    verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature, secret = 'UQa52f9eLZdP1i9LXioxQtZ8') {
        // Create the data string
        const data = `${razorpay_order_id}|${razorpay_payment_id}`;

        // Generate the HMAC-SHA256 signature
        const generated_signature = crypto.createHmac('sha256', secret)
            .update(data)
            .digest('hex');

        // Compare the generated signature with the provided signature
        if (generated_signature === razorpay_signature) {
            return true;
        } else {
            return false;
        }
    }

    create(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const userCart = await Cart.find({ user_id: data.user_id }).populate(['product_id']);
                    const product_details = [];
                    let order_total = 0;
                    for (let uc of userCart) {
                        const finalPrice = uc.product_id.final_price === uc.product_id.original_price ? uc.product_id.original_price : uc.product_id.final_price;
                        product_details.push(
                            {
                                productId: uc.product_id._id,
                                name: uc.product_id.name,
                                qty: uc.qty,
                                price: finalPrice,
                                total: uc.qty * finalPrice
                            }
                        )
                        order_total += uc.qty * finalPrice;
                        // console.log("order_total",order_total)
                    }

                    const order = new Order({
                        user_id: data.user_id,
                        payment_mode: data.payment_mode,
                        shipping_details: data.shipping_details,
                        product_details: product_details,
                        order_total: order_total,
                        processing_fee: data.payment_mode === 1 ? 50 : 0
                    })
                    order.save()
                        .then(
                            async () => {
                                if (data.payment_mode === 1) {
                                    await Cart.deleteMany({ user_id: data.user_id });
                                    res({
                                        msg: "Order placed succussfully",
                                        status: 1,
                                        order_id: order._id,
                                    })
                                } else {
                                    //create  an order in razorpay server
                                    const paymentOptions = {
                                        amount: order_total * 100,  // amount in the smallest currency unit
                                        currency: "INR",
                                        receipt: order._id
                                    }
                                    instance.orders.create(paymentOptions, (err, razorpay_order) => {
                                        if (err) {
                                            rej({
                                                msg: "Unable to initiate payment",
                                                status: 0,
                                                order_id: order._id
                                            })
                                        } else {
                                            res({
                                                msg: "Please pay the amount",
                                                status: 1,
                                                order: order,
                                                razorpay_order
                                            })
                                        }
                                    })
                                }
                            }
                        ).catch(
                            (err) => {
                                rej({
                                    msg: 'Unable to create an order',
                                    status: 0
                                })
                            }
                        )
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }
    paymentSuccess(data) {
        return new Promise(
            (res, rej) => {
                try {
                    if (this.verifyRazorpaySignature(
                        data.razorpay_order_id,
                        data.razorpay_payment_id,
                        data.razorpay_signature
                    )
                    ) {
                        //verification success
                        Order.updateOne(
                            { _id: data.order_id },
                            {
                                razorpay_order_id: data.razorpay_order_id,
                                razorpay_payment_id: data.razorpay_payment_id,
                                order_status: 1
                            }
                        ).then(
                            (success) => {
                                const transaction = new Transaction({
                                    order_id: data.order_id,
                                    razorpay_order_id: data.razorpay_order_id,
                                    razorpay_payment_id: data.razorpay_payment_id,
                                    user_id: data.user_id,
                                    amount: data.amount,
                                    payment_status: 1
                                })
                                transaction.save()
                                    .then(
                                        (success) => {
                                            res({
                                                msg: "Order placed",
                                                status: 1,
                                                order_id: data.order_id,
                                                transaction_id: transaction._id,
                                                payment_status: 1
                                            }
                                            )
                                        }
                                    ).catch(
                                        () => {
                                            rej({
                                                msg: "Unable to create transaction",
                                                status: 0
                                            })
                                        }
                                    )
                            }
                        ).catch(
                            (error) => {
                                rej({
                                    msg: "Unable to update order",
                                    status: 0
                                })
                            }
                        )
                    } else {
                        //varification failed   
                        rej({
                            msg: "Payment verification failed",
                            status: 0
                        })
                    }
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    orderData() {
        return new Promise(
            async (res, rej) => {
                try {
                    const amdinOrders = await Order.find()
                    res({
                        msg: "Data found",
                        status: 1,
                        amdinOrders
                    })
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                };
            });
    }

}

module.exports = OrderController;