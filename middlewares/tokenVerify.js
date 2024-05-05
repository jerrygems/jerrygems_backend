const jwt = require("jsonwebtoken")
const UsersMod = require("../models/UsersMod")

const verifyToken = async (req,resp,next) =>{
    try{
        req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedToken)
    }catch(err){
        console.log(err)
    }
}