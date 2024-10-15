const express = require('express');
const fileupload =require("express-fileupload");
const ProductController = require("../controllers/product_controller");

const ProductRouter = express.Router();
// routes
ProductRouter.post(
    "/create",
        fileupload({
            createParentPath: true
        }), //middleware
        (req, res) => {
           const result = new ProductController().create(req.body, req.files.image ?? null, req.files.other_images);
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

ProductRouter.get(
    "/:id?",
    (req, res) => {
      const result = new ProductController().read(req.params.id ?? null, req.query);
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

ProductRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new ProductController().delete(req.params.id);
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

ProductRouter.put(
    "/update/:id",
    (req, res) => {
        
    }
)
ProductRouter.put(
    "/change-status/:id/:new_status",
    (req, res) => {
        const result = new ProductController().changeStatus(req.params.id, req.params.new_status)
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
module.exports = ProductRouter;