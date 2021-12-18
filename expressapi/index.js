import express from 'express';
import path from 'path';
import cors from 'cors';
import { config } from 'dotenv';
const passport = require('passport');
const cookieSession = require('cookie-session')

import apiRouter from './api.routes';
import createError from './utils/createError';
import logger from './middlewares/logger';
require('./utils/passport');
config();



const app = express();

// Init middleware
app.use(logger);

//Using Cors
app.use(cors());



// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
  name: 'expressmysql',
  keys: ['key1', 'key2']
}))

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

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/good');
}
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

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
    console.log(`Server Started on http://localhost:${PORT}`)
});