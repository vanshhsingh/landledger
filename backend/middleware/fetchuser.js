const jwt  = require('jsonwebtoken')

const JWT_SECRET = 'Raghavisagoodboy123';

const fetchuser = (req,res,next)=>{
    // Get the user fromt he jwt token and add id to req object 
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({error:"Kindly Authenticate using a valid token"})


    }
    try {
        const data = jwt.verify(token,JWT_SECRET )
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({error:"Kindly Authenticate using a valid token"})
    }

}


module.exports = fetchuser;