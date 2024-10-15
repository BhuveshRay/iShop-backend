const express = require('express');
const CategoryController = require('../controllers/category_controller');
const fileupload =require("express-fileupload");


const CategoryRouter = express.Router();
//http://localhost:5000/category/create
// routes
CategoryRouter.post(
    "/create",
    fileupload({
        createParentPath: true
    }), //middleware
    (req, res) => {
       const result = new CategoryController().create(req.body, req.files.image ?? null);
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

CategoryRouter.get(
    "/:id?",
    (req, res) => {
      const result = new CategoryController().read(req.params.id ?? null);
      // null safe operator
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

CategoryRouter.delete(
    "/delete/:id",
    (req, res) => {
     const result = new CategoryController().delete(req.params.id);
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

CategoryRouter.put(
    "/update/:id",
    fileupload({
        createParentPath:true
    }),
    (req, res) => {
        const result = new CategoryController().update(req.params.id, req.body, req.files?.image ?? null);
        result.then(
            (success) => {
                console.log("success", success);
                res.send(success);
            }
           ).catch(
            (error) => {
                res.send(error);
            }
           )
    }
)

CategoryRouter.put(
    "/change-status/:id/:new_status",
    (req, res) => {
        const result = new CategoryController().changeStatus(req.params.id, req.params.new_status)
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
module.exports = CategoryRouter;