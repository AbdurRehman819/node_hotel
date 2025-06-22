const express=require('express')
const db = require('./db');
const bodyParser=require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('welcome to my hotel ... how can i help you?');
});

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);





//import router file
const personRoutes=require('./routes/personRoutes');

//using end points with routers
app.use('/person',personRoutes);


app.listen(3000,()=>console.log("server listening on port 3000"));