const express =require("express");
const dbconnect =require('./database/db')

const User = require("./models/user");

const app=express();

app.use(express.json());

const PORT=3000;

dbconnect().then(()=>{
    console.log('connected successfully')
    app.listen(PORT,()=>{console.log(`Running on PORT:${PORT}`)});
  }
      
  ).catch(
      ()=>{
          console.log('not connected')
      }
  );

app.post('/signup',async (req,res)=>{
    
    let user=new User(req.body)
    
    try{
        await user.save()
        res.send('Success');
    }catch(err){
        res.status(403).send('Forbidden:'+err);
    }
    
    
    
})

app.get("/feed", async (req,res)=>{
    try{
        let users=await User.find({});
        res.send(users)

    }
    catch(err){
        res.status(404).send("Not Found")
    }
})

app.delete("/delete", async (req,res)=>{
    try{
        const deleteUser=await User.deleteOne({firstName:req.body.firstName});
        res.send(deleteUser)
    }catch(err){
        res.status(400).send("Un Successfull")
    }
})

app.patch("/update", async (req,res)=>{
    try{
        const updateUser =await User.updateOne({firstName:req.body.firstName},{firstName:"pk Pawan"})
        res.send(updateUser)
    }catch(err){
        console.log(err);
        res.send("sorryy mann")
    }
})
