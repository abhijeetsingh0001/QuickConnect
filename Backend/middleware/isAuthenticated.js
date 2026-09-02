import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) =>{
  try{
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({message: "Unauthorized"});
    };
    const decoded = await jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if(!decoded){
      return res.status(401).json({message: "Unauthorized"});
    };
    req.id = decoded.userId;

    next();
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
export default isAuthenticated;
