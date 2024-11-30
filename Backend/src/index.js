import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import roleRoutes from './routes/roleRoutes.js';
// import permissionRoutes from './routes/permissionRoutes.js';

const app = express() ;
const port  = 8000 ; 
app.use(cors());
app.use(bodyParser.json()) ;


app.use('/auth' , authRoutes) ;
app.use('/users' , userRoutes) ;
// app.use('/roles' , roleRoutes);
// app.use('/permissions' , permissionRoutes) ;


app.listen(8000 ,  () => console.log(`Server runnning on port ${port}`)) ;



