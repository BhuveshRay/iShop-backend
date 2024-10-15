const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CategoryRouter = require('./routers/category_router');
const ProductRouter = require('./routers/product_router');
const ColorRouter = require('./routers/color_router');
const UserRouter = require('./routers/user_router');
const OrderRouter = require('./routers/order_router');
const AdminRouter = require('./routers/admin_router');
const TransitionRouter = require("./routers/transition_router");
// const { adminAuth } = require('./middlewares/adminAuth');
require('dotenv').config();

const app = express();
app.use(cors()); //middleware
app.use(express.json());
app.use(express.static("public"));
// adminAuth
app.use("/category", CategoryRouter);
app.use("/product", ProductRouter);
app.use("/color", ColorRouter);
app.use("/user", UserRouter);
app.use("/order", OrderRouter);
app.use("/admin", AdminRouter);
app.use("/transition",TransitionRouter)

mongoose.connect(
    "mongodb+srv://bhuveshray:abcdxx@cluster0.rmu0g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        dbName:process.env.DB_NAME
    }
).then(
 () => {
    console.log('DB connected');
    app.listen(
        process.env.PORT,
        () => console.log("Server chalu hai")
    )
 }
).catch(
    () => {
        console.log("kuch to gadbad hai daya");
    }
)


