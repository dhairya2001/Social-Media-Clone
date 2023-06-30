const jwt=require("jsonwebtoken");
// const SECERET_KEY=process.env.SECERET_KEY;
const SECERET_KEY="EMSAPI"
const auth = (req,res,next) =>{
    try {
        let token=req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            let user=jwt.verify(token,SECERET_KEY);
            req.userId=user.id;
        }  
        else{
            res.status(401).json({message:"Unauthorized User"});
        }
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({message:"Unauthorized User"})
    } 
};

module.exports = auth;
