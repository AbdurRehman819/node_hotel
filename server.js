const express=require('express')
const db = require('./db');
const bodyParser=require('body-parser');
const Person=require('./models/person')
const app = express();
app.use(bodyParser.json());//body-parser is a middleware in Node.js used with Express.js. Its job is to automatically parse the 
// //data that comes in the body of HTTP requests, especially in POST, PUT, or PATCH requests.
const LocalStrategy=require('passport-local').Strategy;
const passport=require('passport')
require('dotenv').config();
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}]:request mode to ${req.originalUrl}` );
  next();
}

app.use(logRequest);

passport.use(new LocalStrategy(async(userName,password,done)=>{
   try{
    console.log('credential we recieve',userName,password)
    const user=Person.findOne({username:userName})
    if(!user){
      return done(null,false,{message:"Invalid username"} )
    }
    const isPasswordMatch=user.password===password?true:false;
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null,false,{message:"Incorrect password"});
    }

   }catch(err){
    return done(err)

   }

}))
app.use(passport.initialize());
app.get('/',(req, res) => {
  res.send('welcome to my hotel ... how can i help you?');
});

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);





//import router file
const personRoutes=require('./routes/personRoutes');

//using end points with routers
app.use('/person',personRoutes);
const PORT=process.env.PORT||3000;

//comment added just for testing
app.listen(PORT,()=>console.log("server listening on port 3000"));