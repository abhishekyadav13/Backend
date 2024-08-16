
require("dotenv").config();
const express=require("express")
const app=express()
require("./db/conn")
const Register=require("./models/registers")
const path=require("path")
const hbs=require("hbs")
const bcrypt=require("bcryptjs")
const cookieParser=require("cookie-parser")
const auth=require("./middleware/auth")

const port=process.env.PORT || 3000


const static_path=path.join(__dirname,"../public");
const templates_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",templates_path)
hbs.registerPartials(partials_path)


app.use(express.json());
//to show the data on website
app.use(express.urlencoded({extended:false}))  
app.use(cookieParser())

// app.get("/",(req,res)=>{
//     res.render("index")
// })

// app.get("/register",(req,res)=>{
//     res.render("register")
// })

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/secret",auth,(req,res)=>{
  console.log(`cookies is ${req.cookies.jwt}`)
  res.render("secret")
})

app.get("/logout",async(req,res)=>{
  try {
      console.log(req.user)
      //logout from single device
      //remove cookies from single device except currElement.token return rest all token 
      req.user.token=req.user.token.filter((currElement)=>{
        return currElement.token != req.token
      })

      //logout from all device
      req.user.token=[]

      res.clearCookie("jwt")
      console.log("logout successfully")
      await req.user.save()
      res.render("login")
  } catch (error) {
     res.status(400).send(error)
  }
})


app.post("/register",async(req,res)=>{
      try {
        const password=req.body.password
        const cpassword=req.body.confirmPassword
        if(password===cpassword){
          const registerEmployee=new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            phone:req.body.phone,
            age:req.body.age,
            password:password,
            confirmPassword:cpassword
          })
          //console.log(registerEmployee)
          const token=await registerEmployee.generateAuthToken();
          console.log(`the token part is ${token}`)

          res.cookie("jwt",token,{
            expires:new Date(Date.now()+ 30000),
            httpOnly:true   //client is not allowed to delete cookies
          })
           console.log(cookie)

          const registered=await registerEmployee.save();
          res.status(201).render("index")
        }
        else{
            res.send("password are not matching")
        }
      } catch (error) {
        res.status(500).send(error);
      }
})



app.post("/login",async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;

        const useremail=await Register.findOne({email:email})
        const isMatch=await bcrypt.compare(password,useremail.password)

        if(isMatch){
          const token=await useremail.generateAuthToken();
          console.log(`the token part is ${token}`)
          res.cookie("jwt",token,{
            expires:new Date(Date.now()+ 30000),
            httpOnly:true   //client is not allowed to delete cookies
          })
           res.status(201).render("login")
        }
        else{
            res.send("password is not matching")
        }
    } catch (error) {
        res.status(400).send("Invalid email")
    }
})


// const bcrypt=require("bcryptjs")

// const securePassword=async(password)=>{
//     const passwordHash= await bcrypt.hash(password,10)
//     console.log(passwordHash);

//     const passwordMatch= await bcrypt.compare(password,passwordHash)
//     console.log(passwordMatch)
// }
// securePassword("abhishek")



// const jwt =require("jsonwebtoken");
// const createToken=async()=>{
//     const token=await jwt.sign({_id:"661e46f1994996f9a2123e58"},"mynameisabhishekkumaryadav",{
//         expiresIn:"2 second"
//     })
//     console.log(token);

//     const Userverify=await jwt.verify(token,"mynameisabhishekkumaryadav")
//     console.log(Userverify)
// }
// createToken()


app.listen(port,()=>{
    console.log(`connection is live at port ${port}`)
})