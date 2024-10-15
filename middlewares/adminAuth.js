const { verifyToken } = require("../helper");

function  adminAuth(req, res, next){
const token = req.headers.authorization;
if(verifyToken(token)){
    next();
}else{
    res.send({
        msg: "Unauthorized request",
        status: 0
    })
}
}

module.exports = { adminAuth };