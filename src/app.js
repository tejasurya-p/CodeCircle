const express =require("express");

const app=express();

const PORT=3000;

app.listen(PORT,()=>{console.log(`Running on PORT:${PORT}`)});

app.use("/main",(req,res)=>{
    res.send("Hi Buddy I Am Up And Running ")
})

app.use("/test",(req,res)=>{
    res.send("Hi Buddy I Am Up And Running at /test ")
})