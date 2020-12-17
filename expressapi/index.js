import express from 'express';
import path from 'path';
import cors from 'cors';
import { config } from 'dotenv';
import apiRouter from './api.routes';
import createError from './utils/createError';
import logger from './middlewares/logger';
config();



const app = express();

// Init middleware
app.use(logger);

//Using Cors
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set a static folder
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'));
// });

app.use(express.static(path.join(__dirname,'public')));

// Routes

app.use('/api', apiRouter);

//Home
app.get('/',(req,res)=>{
    res.sendFile('index');
});

// API Routes

//Relationship
// Post.belongsTo(User);
// User.hasMany(Post);


// Send response when is error
app.use((req, res, next) => {
    next(createError(404, 'Page Not Found'));
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      status: 'Error',
      message: error.message || 'Internal server error',
    });
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server Started on port ${PORT}`)
});