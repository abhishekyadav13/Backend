const express=require("express");
const app=express();
const port=3000;

app.get("/",(req,res)=>{
    res.send("<h1>welcome to home page<h1/>");
})
app.get("/about",(req,res)=>{
    res.send("welcome to about page");
})
app.get("/contact",(req,res)=>{
    res.send("welcome to contact page");
})

app.get("/temp",(req,res)=>{
    res.send([{
        id:1,
        name:"abhi"
    },
    {
        id:1,
        name:"abhi"
    },
    {
        id:1,
        name:"abhi"
    }
]);
})


app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})