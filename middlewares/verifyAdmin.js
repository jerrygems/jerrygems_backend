const jwt = require("jsonwebtoken")

const verifyToken = async (req, resp, next) => {
    try {
        const token = req.headers.authorization 
        if (!token) {
            console.log("no token received")
        }
        jwt.verify(token, process.env.SECRET_KEY,(err,decoded)=>{
            // console.log(err,decoded,token)
            if(err){
                return resp.status(401).json({message:";-)"})
            }
            if(decoded.role!=="admin"){
                return resp.status(401).json({message:"hey you can't access this content"})
            }
            next()
        })
    } catch (err) {
        console.log(err)
    }
}
module.exports = verifyToken