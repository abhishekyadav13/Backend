const express=require("express")
require("./db/conn")
const Student=require("./models/students")
const studentRouter=require("./routers/student");

const app=express();
const port=process.env.PORT || 8000;


app.use(express.json());  //to display the data on terminal from postman
app.use(studentRouter);

app.listen(port,()=>{
    console.log(`listening from port ${port}`)
})