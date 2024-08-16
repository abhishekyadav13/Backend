const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/student-api")
.then(()=>{
    console.log("connection is succesful")
}).catch((e)=>{
    console.log("no connection")
})