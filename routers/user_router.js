const express = require('express');
const UserRouter = express.Router();
const UserController = require('../controllers/user_controller');

// Signup route
UserRouter.post(
    '/signup',
    (req, res) => {
        const result = new UserController().signup(req.body);
        result
            .then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
);

// Login route
UserRouter.post(
    '/login',
    (req, res) => {
        const result = new UserController().login(req.body);
        result
            .then(
                (success) => {
                    res.send(success);
                }
            ).catch(
                (error) => {
                    res.send(error);
                }
            )
    }
);

UserRouter.post(
    '/move-to-cart/',
    (req, res) => {
        const result = new UserController().moveToDBCart(req.body);
        result
        .then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
);

UserRouter.post(
    "/add-address/:user_id",
    (req, res) => {
        const result = new UserController().addAddress(req.params.user_id, req.body);
        result
            .then(
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

UserRouter.get(
    "/get-user-address/:user_id",
    (req, res) => {
        const result = new UserController().getUserAddress(req.params.user_id);
        result
            .then(
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

UserRouter.get(
   "/user-data/user_id",
    async(req, res) => {
        const result = new UserController().userData(req.params.user_id);
        result
        .then(
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
UserRouter.put(
    "/change-status/:id/:new_status",
    (req, res) => {
        const result = new UserController().changeStatus(req.params.id, req.params.new_status)
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
UserRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new UserController().delete(req.params.id);
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
 
UserRouter.put( "/edit-user/:user_id",
    (req, res) => {
        const result = new UserController().editUser(req.params.user_id,req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        );
    }

)


module.exports = UserRouter;
