const Product = require("../models/product_model");
const Category = require("../models/category_model");
const Color = require("../models/color_model");
const { unlinkSync } = require('fs')
class ProductController {
    create(data, image, otherImages){
       return new Promise(
       async (resolve, reject) => {
            try {
                const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name
                const destination = ".public/images/product/" +imageName;
                const otherImagesName = [];
                image.mv(
                    destination,
                  async  (err) => {
                        if(err){
                            rej({
                                msg:"Unable to upload the file",
                                status: 0
                            })
                        }else{
                            // if(Array.isArray(otherImages)){
                                const movePromises =otherImages.map(
                                    async(otherImage) => {
                                        const imgName = new Date().getTime() + Math.floor(Math.random() * 1000) + otherImage.name;  
                                            const imgDestination = "./public/images/product/" +imgName;
                                            try{
                                             await  otherImage.mv(imgDestination);
                                             otherImagesName.push(imgName);
                                            }catch(err){
                                                reject({
                                                    msg: 'Unable to  upload image',
                                                    status: 0
                                                })
                                            }
                                    }
                                )
                            // }else{

                            // }
                            
                        await Promise.all(movePromises);
                            const product = new Product(
                                { name: data.name, slug: data.slug,
                                    image: imageName, original_price:data.original_price, discount_percent: data.discount_percent,
                                    final_price: data.final_price,
                                    category:data.category,
                                    color: JSON.parse(data.color),
                                    other_images: otherImagesName
                                })
                            product.save()
                            .then(
                                () => {
                                  resolve( {
                                        msg: "Product created",
                                        status:1
                                    })
                                }
                            ).catch(
                                (error) => {
                                    reject( { 
                                        msg: "Unable to create a product ",
                                        status:0,
                                        // error: error.message
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
    
    read(id, query){
        return new Promise(
          async  (res, rej) => {
                try{
                    if(id){
                        const product = await Product.findById(id).populate(['category', 'color']);
                        res({
                            status:1,
                            product,
                            imageBaseUrl: "/images/product/"
                        })
                    }else{
                        const filter = {};
                        if(query.category_slug){
                            const cat = await Category.findOne({slug:query.category_slug});
                            if(cat != null){
                                filter.category = cat._id;
                            }
                        }
                        if(query.range_start && query.range_end){
                             filter.final_price = {
                                "$gte":Number(query.range_start),
                                "$lte":Number(query.range_end),
                             }
                        }
                        if(query.color_id){
                            filter.color = query.color_id;
                        }
                        const products = await Product.find(filter)
                        .populate(['category', 'color'])
                        .limit(query.limit ?? 0);
                        // 
                    res({
                        msg: products.length + " records found",
                        status:1,
                        products,
                        imageBaseUrl:"/images/product/"
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
                  try{
                    await Product.deleteOne(
                        {
                            _id: id
                        }
                    ).then(
                        () => {
                            res({
                                msg: "Product Deleted",
                                status:1,
                            })
                        }
                    ).catch(
                        () => {
                            rej({
                                msg:"Unable to delete the product",
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

//    update(id, data, image){
//         return new Promise(
//             async  (res, rej) => {
//                   try{
//                     if(image == null){
//                     unlinkSync("./public/images/category/" + data.old_name);
//                         Category.updateOne({_id:id}, {name: data.name, slug: data.slug})
//                         .then(
//                             () => {
//                                 res({
//                                     msg:"Data updated",
//                                     status: 1
//                                 })
//                             }
//                          ).catch(
//                             () => {
//                                 rej({
//                                     msg:"Unable to Update data",
//                                     status: 0
//                                 })
//                             }
//                          )  
//                     }else{
//                         const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + image.name
//                         const destination = "./public/images/category/" +imageName;
//                         image.mv(destination,
//                             (err) => {
//                                 if(err){
//                                     rej({
//                                         msg: "Unable to update",
//                                         status: 0
//                                     })
//                                 }else{
//                                     Category.updateOne({_id:id}, {name: data.name, slug: data.slug, image_name: imageName})
//                         .then(
//                             () => {
//                                 res({
//                                     msg:"Data updated",
//                                     status: 1
//                                 })
//                             }
//                          ).catch(
//                             () => {
//                                 rej({
//                                     msg:"Unable to Update data",
//                                     status: 0
//                                 })
//                             }
//                          ) 
//                                 }
//                             }
//                         )
//                     }  
//                   } catch(err) {
//                       rej({
//                         msg: "Internal server error",
//                         status: 0
//                       })
//                   }
//               }
//           )
//     }
changeStatus(id,new_status){
    return new Promise(
        (res, rej) => {
            try{
                Product.updateOne(
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

module.exports = ProductController;