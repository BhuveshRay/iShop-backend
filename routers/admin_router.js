const express = require('express');
const AdminController = require('../controllers/admin_controller');

const AdminRouter = express.Router();
AdminRouter.post(
    '/signup',
    (req, res) => {
        const result = new AdminController().signup(req.body);
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
AdminRouter.post(
    '/login',
    (req, res) => {
        const result = new AdminController().login(req.body);
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

module.exports = AdminRouter;