const express = require('express');
const mongoose = require('mongoose');
const bParser = require('body-parser');
const passport = require('passport');
const path = require('path');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express(); 
  
app.use(bParser.urlencoded({extended: false}));
app.use(bParser.json());

 //For database configuration

const db = require('./config/keys').mongoURI;
 

 // Actually connecting
 mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if (!err) console.log('success');
    else console.log('fail');
}) 


//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

 //Use routes
 app.use('/api/users',users);
 app.use('/api/profile',profile);
 app.use('/api/posts',posts);


 // Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

  

 const port = process.env.PORT || 5000;

 app.listen(port, ()=>console.log(`Server on port ${port}`)); 