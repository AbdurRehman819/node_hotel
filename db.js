const mongoose=require("mongoose");
require('dotenv').config();
//const mongoUrl=process.env.LocalHost_URL;
const mongoUrl=process.env.MONGODB_URL;
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});


const db=mongoose.connection;


//can define events like this using  db.on
db.on('connected',()=>{
    console.log("connected to mongodb server");
});
db.on('disconnected',()=>{
    console.log("disconnected from mongodb server");
});
db.on('error',(err)=>{console.log("error occured");});
module.exports=db;