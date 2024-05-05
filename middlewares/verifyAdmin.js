const jwt = require("jsonwebtoken")

const verifyToken = async (req, resp, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            console.log("no token received")
        }
        jwt.verify(token, process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                console.log("error occurred while verifying")
                return resp.status(401).json({message:"error occured"})
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