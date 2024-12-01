import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET =  process.env.TOKEN_SECRET ;
//Sign Up
export const signup = async(req , res)=>{

    const{name ,email , password , role} = req.body;

    try {
        const existingUser = await prisma.user.findUnique(
            {
                where: {email} 
            }
        );
        if(existingUser){
            return res.status(400).json({message:'User already exists'}) ;
          
        }

        const hashedPassword = await bcrypt.hash(password, 10) ;

        const existingRole = await prisma.role.findUnique({
            where : {name : role} , 
        })
     
        if(!existingRole) {
            return res.status(400).json({ message: 'Role not found' });

        }
        const user  = await prisma.user.create(
            {
                data :  {
                    name,
                    email ,
                    password : hashedPassword,
                    role: {
                        connect: {
                            id: existingRole.id,  
                        },
                    }
                }
            } , 
        );
    res.status(201).json({message : 'User has been created successfully' , user :user}) ;


    } 
    catch(error) {
        console.error(error);
        res.status(500).json({message : 'Internal server error' , error: error.message});
    }  
};

//Login 
   export const login = async (req , res) => {
        const {email , password}  = req.body ; 

        try {
            const user = await prisma.user.findUnique({where : {email}  , include: {
                role: true  
            }});

            if(!user) {
                return res.status(404).json({message : 'User not found'});
            }

            const isPasswordValid = await bcrypt.compare(password , user.password) ;

            if(!isPasswordValid){
                return res.status(401).json({message : 'Invalid credentials'}) ; 

            }

            // token generation , after passwrd valid
            const token = jwt.sign({
                id : user.id, email : user.email  , role: user.role.name, }
                , SECRET  , 
                {expiresIn : '1h'} 
            ); 
    res.status(200).json({message : 'Login was successfull' , token}) ;
        } catch (error) {
            res.status(500).json({message : 'Internal Server Error' , error :error.message}) ;
        }
    } ; 

 


