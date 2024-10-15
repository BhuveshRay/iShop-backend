const Color = require("../models/color_model");

class ColorController {
    create(data){
        // console.log(data);
       return new Promise(
        (resolve, reject) => {
            try {
                const color  = new Color(
                    { name: data.name, code: data.code}
                )
                color.save()
                            .then(
                                (success) => {
                                  resolve( {
                                        msg: "color created",
                                        status:1
                                    })
                                }
                            ).catch(
                                () => {
                                    reject( {
                                        msg: "Unable to create a color ",
                                        status:0
                                    })
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
                        const color = await Color.findById(id);
                        res({
                            status:1,
                            color
                        })
                    }else{
                        const colors = await Color.find();
                    res({
                        msg: colors.length + " records found",
                        status:1,
                        colors
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
                    await Color.deleteOne(
                        {
                            _id:id
                        }
                    ).then(
                        () => {
                            res({
                                msg: "Color Deleted",
                                status:1,
                            })
                        }
                    ).catch(
                        (err) => {
                            console.log(err.message)
                            rej({
                                msg:"Unable to delete the color",
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

    changeStatus(id,new_status){
        return new Promise(
            async  (res, rej) => {
                  try{
                     Color.updateOne(
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
                            rej({
                                msg:"Unable to change the status",
                                status: 0
                            })
                        }
                     )    
                  } catch(err) {
                    console.log(err.message);
                      rej({
                        msg: "Internal server error",
                        status: 0
                      })
                  }
              }
          )
    }

}

module.exports = ColorController;