const Transaction = require("../models/transaction_model");

class TransitionController{
    transitionData(url_que){
        return new Promise(
            async (res, rej) => {
                try {
                    const query = {};
                    if(url_que.order_id){
                        query.order_id = url_que.order_id
                    }
                    if(url_que.transaction_id){
                        query._id = url_que.transaction_id
                    }
                    if(url_que.payment_status){
                        query.payment_status = url_que.payment_status
                    }
                    if(url_que.type){
                        query.type = url_que.type
                    }
                    if(url_que.user_id){
                        query.user_id = url_que.user_id
                    }
                    if(url_que.start_date && url_que.end_date){
                        query.createdAt = {
                            $gte : new Date(new Date(url_que.start_date).setHours(0,0,0)),
                            $lt : new Date(new Date(url_que.end_date).setHours(23,59,59))
                        }
                    }
                    const transactions = await Transaction.find(query).populate(['user_id', 'order_id']);
                    res({
                        msg : "transition data find",
                        status : 1,
                        transactions
                    })
                } catch (err) {
                    rej({
                        msg: 'Internal Server error of mine',
                        status: 0
                    })
                }
            }
            )
    }
}

module.exports = TransitionController;