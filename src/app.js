const express =require("express");

const app=express();

const PORT=3000;

app.listen(PORT,()=>{console.log(`Running on PORT:${PORT}`)});

app.use("/",(req,res,next)=>{
    try{

        throw new exception("hii");
       
        
        
    }
    catch{
        res.send("something gone")
    }
    //res.send("Hi Buddy I Am Up And Running ")
})

app.use("/main",(req,res)=>{
    res.send("Hi Buddy I Am Up And Running at /test ")
})