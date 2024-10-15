const {v1} = require( "uuid")
const userTokens = new Map();


 function createToken(data){
  const token = v1();
  if(userTokens.get(token) === undefined){
    userTokens.set(token, data);
    return token;
  }else{
    return createToken(data); // recursion
  }
 
 }

 function verifyToken(token){
    if(userTokens.get(token) === undefined) return false
    else return true;
 }

 module.exports = {createToken, verifyToken};