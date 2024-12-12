const express =require("express");
const dbconnect =require('./database/db')

const User = require("./models/user");

const app=express();

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
    let user=new User({
        firstName:"surya",
        lastName:"teja",
    })
    try{
        await user.save();
        res.send('Success');
    }catch(err){
        res.status(403).send('Forbidden');
    }
    
    
    
})


