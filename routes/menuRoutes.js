const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/menu');


router.post('/',async(req,res)=>{
  try{
    const menuData=req.body;

    const NewItem= new MenuItem(menuData);

    const response=await NewItem.save();

    console.log(response);
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internel error occured"});
  }
});
router.get('/',async(req,res)=>{
  try{
    const menuData=await MenuItem.find();
    console.log("Menu is fetched");
    res.status(200).json(menuData);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal error occurred" });
  }
});

router.get('/:taste',async(req,res)=>{
    try{
        const itemTaste= req.params.taste;
    if(itemTaste=='spicy'||itemTaste=='sweet'||itemTaste=='sour'){
        const response=await MenuItem.find({taste:itemTaste});
        console.log("successfuly fetched");
        res.status(200).json(response);
    }
    else{
     res.status(404).json({error:"invalid taste"});
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal error occurred" });
    }
});

router.put('/:id',async(req,res)=>{
  try{const personId= req.params.id;
  const personData=req.body;
  const response=await  MenuItem.findByIdAndUpdate(personId,personData,{
    runValidators:true, // ensures the update obeys your schema rules
    new:true  // returns the updated document (not the old one)
  });
  if(!response){
     res.status(404).json({ error: "Item not found not found" });
  }
  console.log("Menu updated ",response);
  res.status(200).json(response);
}
  catch(err){
     console.log(err);
        res.status(500).json({ error: "Internal error occurred" });

  }
}),

router.delete('/:id',async(req,res)=>{
 try{const  itemID=req.params.id;
 const response= await MenuItem.findByIdAndDelete(itemID);
 if(!response){
     res.status(404).json({ error: "Item not found" });
  }
  console.log("Item deleted from menu  ",response);
  res.status(200).json(response);
}
catch(err){console.log(err);
        res.status(500).json({ error: "Internal error occurred" });}

})
module.exports=router;