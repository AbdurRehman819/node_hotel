const express=require('express')
const db = require('./db');
const bodyParser=require('body-parser');

const app = express();
const passport=require('./auth');
app.use(bodyParser.json());
//body-parser is a middleware in Node.js used with Express.js. Its job is to automatically parse the 
// //data that comes in the body of HTTP requests, especially in POST, PUT, or PATCH requests.

require('dotenv').config();
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}]:request mode to ${req.originalUrl}` );
  next();
}

app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})
app.get('/',localAuthMiddleware,(req, res) => {
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