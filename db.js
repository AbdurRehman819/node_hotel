const mongoose=require("mongoose");
const mongoUrl='mongodb://localhost:27017/hotel';

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