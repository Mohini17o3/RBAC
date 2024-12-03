import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs' ;
const prisma = new PrismaClient();


export const createUser = async (req, res) => {
  try {
    const { email, name, password , role } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: "Email, name, and password are required" });
    }

    let roleId = null ;
    let roleRecord = null ;

    if(role) {
       roleRecord =  await prisma.role.findUnique({
         where : {
           name : role , 
         }
      }) ;
    } 

    if(!roleRecord) {
      return res.status(400).json({error : `Role ${role} does not exist`});

    }

    if (roleRecord) {
      roleId = roleRecord.id;
    }
    const hashedPassword = await bcrypt.hash(password , 10 ) ;

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword ,
        status: true,
        roleId,
      },
      include : {
        role : true , 
      } , 
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error) ;
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  const currentUserRole = req.user.role;
  const currentUser  =  req.user.name ; 
  const currentUserEmail  =  req.user.email ; 
  try {
    const users = await prisma.user.findMany({
      include: { role: {
        select :{
          name : true , 
        }
      } }, 
    });

    res.status(200).json({users , currentUserRole , currentUser , currentUserEmail});
  } catch (error) {
    console.error("Error fetching users:", error.message || error);
    res.status(500).json({ error: error.message || "Internal Server Error" });  }
};

export const updateUsers = async (req, res) => {
  const { name, email, role } = req.body; 
  try {
    const roleRecord = await prisma.role.findUnique({
      where: { name: role }, 
    });

    if (!roleRecord) {
      return res.status(400).json({ message: "Role not found" });
    }


    const user = await prisma.user.update({
      where: {
        email, 
      },
      data: {
        name,   
        email,  
        roleId: roleRecord.id, 
      },
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const deleteUser = async (req, res) => {
  const {userId} = req.params;


  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    await prisma.user.delete({
      where: {
        id: userId, 
      },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
