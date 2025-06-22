const express=require('express')
const db = require('./db');
const bodyParser=require('body-parser');
const app = express();
app.use(bodyParser.json());
require('dotenv').config();
app.get('/', (req, res) => {
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