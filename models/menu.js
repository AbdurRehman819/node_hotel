const mongoose=require('mongoose');

const menuItemIschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:["spicy","sweet","sour"],
        required:true,
    },
    is_drinl:{
        type:Boolean,
        default:false,
    },
    ingredients:{
        type:[String],
        default:[],
    },
    sales:{
        type:Number,
        default:0,
    },
});

const MenuItem=mongoose.model('MenuItem',menuItemIschema);
module.exports=MenuItem;