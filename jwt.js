const jwt=require('jsonwebtoken')

const jwtAuthMiddleWare=(req,res,next)=>{

//first check request header have authorization or not
const authorization=req.headers.authorization;
if(!authorization)return res.status(401).json({message:"Token not found"});


    //extracting jwt token from req body
const token=req.headers.authorization.split(' ')[1];
if(!token) return res.status(401).json({message:"Unauthorized"});

try{
    
    //verify jwt token 
    const decoded= jwt.verify(token,process.env.JWT_SECERET);
   
    //attatch
   req.user=decoded;
   next();
}catch(err){
     console.log(err);
     res.status(500).json({error:"Invalid token"});
}

}

const generateToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECERET);
}

module.exports={generateToken,jwtAuthMiddleWare}