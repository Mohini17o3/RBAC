import jwt from 'jsonwebtoken' ;


const SECRET = process.env.TOKEN_SECRET ;


function rbacMiddleware(requiredRole) {


    return (req , res , next) => {
        const token = req.headers["authorization"]?.split(" ")[1];

        if(!token){
            return res.status(401).json({ message: "Authentication required" });

        }

        jwt.verify(token , SECRET , (e , decoded) =>{
            if(e){
                return res.status(403).json({ message: "Invalid token" });

            }

            if(decoded.role != requiredRole){
                return res.status(403).json({ message: "Access denied" });

            } 

            req.user = decoded;  
      next();

        } )
    }
}

export default rbacMiddleware ;