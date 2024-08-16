const mongoose=require("mongoose")
const validator=require("validator")


//Defining Schema
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        // minlength:10,
        // maxlength:11
        validate: {
            validator: function(value) {
                return String(value).length >= 10 && String(value).length <= 10;
            },
            message: 'Phone number must be between 10 digits'
        }
    },
    address:{
        type:String,
        required:true
    }
})

//we will create a new collection 
const Student=new mongoose.model("Student",studentSchema);

module.exports=Student;
