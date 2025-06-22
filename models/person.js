const mongoose=require("mongoose");

const personschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        
    },
    work:{
        type:String,
        enum:["chef","waiter","manager"],//it should b among them
        required:true,
    }
    ,
    mbile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        

    },
    address:{
        type:String,

    },
    salary:{
        type:Number
    }
});

const Person=mongoose.model('Person',personschema);
module.exports=Person;