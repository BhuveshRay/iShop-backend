const {Router} = require('express');
const TransitionController = require('../controllers/transition_controller')

const TransitionRouter = Router();

TransitionRouter.get(
    "/get-transaction",
    (req, res) => {
        const result = new TransitionController().transitionData(req.query);
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

module.exports = TransitionRouter;