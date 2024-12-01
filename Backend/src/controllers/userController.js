import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createUser = async (req, res) => {
  try {
    const { email, name, roleId, status } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        status: status || "active",
        roleId: roleId || null,
      },
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  const currentUserRole = req.user.role;

  try {
    const users = await prisma.user.findMany({
      include: { role: {
        select :{
          name : true , 
        }
      } }, 
    });

    res.status(200).json({users , currentUserRole});
  } catch (error) {
    console.error("Error fetching users:", error.message || error);
    res.status(500).json({ error: error.message || "Internal Server Error" });  }
};

// export const updateUsers =  async(req , res) => {
//     const {email} = req.body ; 
//     try {
//         const users = await prisma.user.update({
//             where : {
//                 email , 
//             } , 
//             data : {
                
//             }
//         })
//     }
// }

