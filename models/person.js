const mongoose=require("mongoose");
const bcrypt=require('bcrypt');

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
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

personschema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password')){
        return next();
    }
    try{
        const salt= await bcrypt.genSalt(10); //generating salt 

        const hashPassword=await bcrypt.hash(person.password,salt);
        person.password=hashPassword;

    }catch(err){
        return next(err);

    }
});

personschema.methods.comparePassword=async function(candidatePassword){

    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

const Person=mongoose.model('Person',personschema);
module.exports=Person;