const express=require('express');
const router=express.Router();
const Person = require('./../models/person');

// to save data from client to database
router.post('/',async(req,res)=>{
  try{
  const data=req.body;

  const newPerson=new Person(data);

  const response=await newPerson.save();
  console.log("successfully saved");
  res.status(200).json(response);
                 
  }catch(err){
    console.log(err);
  res.status(500).json({error:"internel error occured"});
  }
})
//to get data from database to client
router.get('/',async(req,res)=>{
  try{
    const data=await Person.find();
    console.log("Data is fetched");
    res.status(200).json(data)
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Error occured"});
  }

});

//parameterized end point
router.get('/:workType',async(req,res)=>{
  try{
    const workType=req.params.workType;
    if(workType=='chef'|| workType =='manager'|| workType=='waiter'){
      const response=await Person.find({work:workType});
      console.log('succesfully fetched',response);
      res.status(200).json(response);
    }
    else{
      res.status(404).json({ error: "invalid work type" });
    }
  }catch(err){
     console.log(err);
    res.status(500).json({ error: "Internal error occurred" });
  }
});

router.put('/:id',async(req,res)=>{
 try{
   const personId=req.params.id;
   const updatedData=req.body;
   const response= await Person.findByIdAndUpdate(personId,updatedData,{
    new:true,runValidators:true
  });
  if(!response){
    res.status(404).json({ error: "Person not found" });

  }
  console.log("Updated sucessfully",response);
  res.status(200).json(response);

 }catch(err){
   console.log(err);
    res.status(500).json({ error: "Internal error occurred" });

 }
});

router.delete('/:id',async(req,res)=>{
  try{const personId=req.params.id;
  const response=await Person.findByIdAndDelete(personId);
  if(!response){
    res.status(404).json({ error: "Person not found" });

  }
  console.log("successfully deleted",response);
  res.status(200).json(response);}
  catch(err){
     console.log(err);
    res.status(500).json({ error: "Internal error occurred" });

  }
});


module.exports=router;