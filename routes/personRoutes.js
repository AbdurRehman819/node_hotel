const express=require('express');
const router=express.Router();
const Person = require('./../models/person');
const {generateToken,jwtAuthMiddleWare} = require('./../jwt');
const multer=require('multer');


const storage=multer.memoryStorage(); 

const upload=multer(storage);

// create new person 
router.post('/signup',upload.single('photo'),async(req,res)=>{
  try{
    const photoBase64=  req.file?req.file.buffer.toString('base64'):null;
  const data=req.body;

  const newPerson=new Person({
    name:data.name,
     age:data.age,
    mbile:data.mbile,
    email:data.email,
    address:data.address,
    salary:data.salary,
    username:data.username,
    password:data.password,
    work:data.work,
    photo:photoBase64
  });

  const response=await newPerson.save();
  console.log("successfully saved");
  const Payload={id:response.id,username:response.username};

  const token=generateToken(Payload);
  console.log('Token is :',token);
  res.status(200).json({response:response,token:token});            
  }
  catch(err){
    console.log(err);
  res.status(500).json({error:"internel error occured"});
  }
})
//log in rout 
router.post('/login',async(req,res)=>{
  try{
    //extract username and password from body
    const {username,password}=req.body;
    //finding user by username
    const user=await Person.findOne({username:username});
//checking if user name or pasword incorrect
    if(!user || !( await user.comparePassword(password))){
      return res.status(404).json({message:"Invalid username or password"});
    }
  //generatiing token
    const payload={
      id:user.id,
      username:user.username
    }
    const token= generateToken(payload);

   //returning token as response
    res.status(200).json({token});

  }catch(err){
    console.log(err);
    res.status(500).json({error:'internel server error'});
    

  }
  

  }
);
//profile route
router.get('/profile',jwtAuthMiddleWare,async(req,res)=>{
 try{
   const userData=req.user;
  console.log('user data:',userData);

  const userID=userData.id;

  const response= await Person.findById(userID);

  res.status(200).json(response);
 }catch(err){
   
  console.log(err);
  res.status(500).json({error:"internel server error"});
 }

})
//to get data from database to client
router.get('/',jwtAuthMiddleWare,async(req,res)=>{
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
    new:true,  // returns the updated document (not the old one)
    runValidators:true// ensures the update obeys your schema rules
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