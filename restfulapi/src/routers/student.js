const express=require("express");
const router=new express.Router();
const Student=require("../models/students")


// router.post("/students",(req,res)=>{

//     console.log(req.body);
//     const user=new Student(req.body)
//     //using promises
//     user.save().then(()=>{    //use to show data on mongoDB from postman
//         res.status(201).send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
//     //res.send("hello from student side");
// })



//using async and await
router.post("/students",async(req,res)=>{
    try {
        const user=new Student(req.body)
        const createUser=await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//read data of registered student
router.get("/students",async(req,res)=>{
    try {
        const studentsData=await Student.find();
        res.send(studentsData);
    } catch (error) {
        res.send(error);
    }
})

//get data by id
router.get("/students/:id",async(req,res)=>{
    try {
        const _id=req.params.id;
        const studentData=await Student.findById(_id);
        if(!studentData){
            res.status(404).send()
        }
        else{
            res.send(studentData)
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
})

// router.get("/students/:name",async(req,res)=>{
//     try {
//         const _name=req.params.name;
//         const studentData=await Student.findOne({name:_name});
//         if(!studentData){
//             res.status(404).send()
//         }
//         else{
//             res.send(studentData)
//         }
        
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

//update the data
// router.patch("/students/:id",async(req,res)=>{
//     try {
//         const _id=req.params.id;
//         const updateStudent=await Student.findByIdAndUpdate(_id,req.body,{
//             new:true     //just by clicking once on send(in postman) it update else we have to click twice
//         })
//         res.send(updateStudent);
//     } catch (error) {
//       res.status(404).send(error);   
//     }
// })

router.patch("/students/:phone",async(req,res)=>{
    try {
        const _phone=req.params.phone;
        const updateStudent=await Student.updateOne({phone:_phone},req.body,{
            new:true     //just by clicking once on send(in postman) it update else we have to click twice
        })
        res.send(updateStudent);
    } catch (error) {
      res.status(404).send(error);   
    }
})

//delete student data
router.delete("/students/:id",async(req,res)=>{
    try {
        const _id=req.params.id;
        const deleteStudent=await Student.findByIdAndDelete(_id);
        if(!deleteStudent){
            res.status(404).send()
        }
        res.send(deleteStudent)
    } catch (error) {
        res.status(500).send(error)
    }
})




module.exports=router;