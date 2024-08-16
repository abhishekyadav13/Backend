const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const employeeSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true 
        }
    }]
})

employeeSchema.methods.generateAuthToken=async function(){
    try {
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        console.error(`Error generating auth token: ${error}`);
        throw new Error('Unable to generate auth token');
    }
}



employeeSchema.pre("save",async function(next){
    //if password field is saved or modified then only do hashing for other field
    //modification there is no need to see the password
     if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
        // this.confirmPassword=undefined;
        this.confirmPassword=await bcrypt.hash(this.password,10);
     }
     next();
})

const Register=new mongoose.model("Register",employeeSchema)

module.exports=Register;