const express = require('express');
const OrderController = require('../controllers/order_controller');


const OrderRouter = express.Router();
//http://localhost:5000/category/create
// routes
OrderRouter.post(
    "/create",
    (req, res) => {
       const result = new OrderController().create(req.body);
       result.then(
        (success) => {
            res.send(success);
        }
       ).catch(
        (error) => {
            res.send(error);
        }
       )
    }
)

OrderRouter.post("/payment-success",
    (req, res) => {
        const result = new OrderController().paymentSuccess(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
           ).catch(
            (error) => {
                res.send(error);
            }
           )
    }
)
OrderRouter.get("/order-data",
    (req, res) => {
        const result = new OrderController().orderData();
        result.then(
            (success) => {
                res.send(success);
            }
           ).catch(
            (error) => {
                res.send(error);
            }
           )
    }
)
module.exports = OrderRouter;