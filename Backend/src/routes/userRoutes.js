import express from 'express' ; 
import { getUsers,
    updateUsers,
    deleteUser, createUser } from '../controllers/userController.js';
import rbacMiddleware from '../middlewares/rbacMiddleware.js';    
const router  = express.Router() ;

// CRUD 

router.post("/", rbacMiddleware("admin") , createUser); 
router.get("/", getUsers);
router.patch("/:userId", rbacMiddleware("admin") , updateUsers); 
router.delete("/:userId", rbacMiddleware("admin") , deleteUser); 

export default router ;