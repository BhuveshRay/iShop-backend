const Category = require("../models/category_model");
const Product = require('../models/product_model');
const { unlinkSync } = require('fs')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

class CategoryController {
    create(data, image){
       return new Promise(
        (resolve, reject) => {
            try {
                //2345652113241.jpg
                //654312345671.jpg
                const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name
                const destination = "./public/images/category/" +imageName;
                image.mv(
                    destination,
                    (err) => {
                        if(err){
                            rej({
                                msg:"Unable to upload the file",
                                status: 0
                            })
                        }else{
                            const category = new Category(
                                { name: data.name, 
                                slug: data.slug,
                                 image_name: imageName
                                })
                            category.save()
                            .then(
                                (success) => {
                                  resolve( {
                                        msg: "Category created",
                                        status:1
                                    })
                                }
                            ).catch(
                                () => {
                                    reject( {
                                        msg: "Unable to create a category ",
                                        status:0
                   })
                                }
                            ) 
                        }
                    }
                )
               
            }catch (err) {
                reject( {
                    msg: "Internal server error",
                    status:0
                })
            }
        }
       )
    }
    read(id){
        return new Promise(
          async  (res, rej) => {
                try{
                    if(id){
                        const category = await Category.findById(id);
                        res({
                            status:1,
                            category
                        })
                    }else{
                        const categories = await Category.find();
                        const catData = await Promise.all(
                            categories.map(
                                async(cat) => {
                                    const prodCount = await Product.find({category:cat.id}).countDocuments();
                                    return{
                                        ...cat.toJSON(),
                                        prodCount
                                    }
                                }
                            )
                        ) 
                    res({
                        msg: categories.length + " records found",
                        status:1,
                        categories:catData,
                        imageBaseUrl:"/images/category/"
                    })
                    }
                    
                } catch(err) {
                    rej({
                        msg: "Internal server error",
                        status:0
                    })
                }
            }
        )
    }

    delete(id){
        return new Promise(
            async  (res, rej) => {
                const imagePath = await Category.findById(id);
                    // fs.unlink('./public/images/category/' + id) 
                try{
                    await Category.deleteOne(
                        {
                            _id:id
                        }
                    ).then(
                        () => {
                            res({
                                msg: "Item Deleted",
                                status:1,
                            })
                        }
                    ).catch(
                        () => {
                            rej({
                                msg:"Unable to delete the item",
                                status: 0
                            }) 
                        }
                    )
                    
                  } catch(err) {
                      rej({
                          msg: "Internal server error",
                          status:0
                      })
                  }
              }
          )
    }
   update(id, data, image){
        return new Promise(
            async  (res, rej) => {
                  try{
                    if(image == null){
                    unlinkSync("./public/images/category/" + data.old_name);
                        Category.updateOne({_id:id}, {name: data.name, slug: data.slug})
                        .then(
                            () => {
                                res({
                                    msg:"Data updated",
                                    status: 1
                                })
                            }
                         ).catch(
                            () => {
                                rej({
                                    msg:"Unable to Update data",
                                    status: 0
                                })
                            }
                         )  
                    }else{
                        const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name
                        const destination = "./public/images/category/" +imageName;
                        image.mv(destination,
                            (err) => {
                                if(err){
                                    rej({
                                        msg: "Unable to update",
                                        status: 0
                                    })
                                }else{
                                    Category.updateOne({_id:id}, {name: data.name, slug: data.slug, image_name: imageName})
                        .then(
                            () => {
                                res({
                                    msg:"Data updated",
                                    status: 1
                                })
                            }
                         ).catch(
                            () => {
                                rej({
                                    msg:"Unable to Update data",
                                    status: 0
                                })
                            }
                         ) 
                                }
                            }
                        )
                    }  
                  } catch(err) {
                      rej({
                        msg: "Internal server error",
                        status: 0
                      })
                  }
              }
          )
    }

    changeStatus(id,new_status){
        return new Promise(
            (res, rej) => {
                try{
                    Category.updateOne(
                        {
                            _id:id
                        },
                        {
                            status: new_status
                        }
                    ).then(
                        () => {
                            res({
                                msg:"Status changed",
                                status: 1
                            })
                        }
                    ).catch(
                        () => {
                            rej( {
                                    msg:"Unable to change the status",
                                    status:0
                                })
                        }
                    )
                }catch(err){
                    rej({
                        msg:"Internal server error",
                        status:0
                    })
                }
            }
        )

    }
}

module.exports = CategoryController;