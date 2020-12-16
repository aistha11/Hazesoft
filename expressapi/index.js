const express = require('express');
const path = require('path');

// import express, { static } from 'express';
// import { join } from 'path';

const logger = require('./middleware/logger');

const app = express();

// Init middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set a static folder
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'));
// });
app.use(express.static(path.join(__dirname,'public')));

// Routes

//Home
app.get('/',(req,res)=>{
    res.sendFile('index');
});

// API Routes
//Mount Routes


//Relationship
// Post.belongsTo(User);
// User.hasMany(Post);


// Members
app.use('/api/members', require('./routes/members'));

// Employee
app.use('/api/employees', require('./routes/employees'));




const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server Started on port ${PORT}`)
});