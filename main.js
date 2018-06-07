const express=require("express");
const path=require("path");
const app=express();

app.use(express.static(path.resolve(__dirname,"public")));

app.use("/",function(req,res,next){
    res.sendFile(path.resolve(__dirname,"public","main.htm"));
});

app.listen(8080);
