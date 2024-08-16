const mongoose=require("mongoose");
const validator=require("validator")

//connection creation ang creating a new db
mongoose.connect("mongodb://localhost:27017/abhishekKY")
.then(()=>console.log("connection successfull.."))
.catch((err)=>console.log(err));


//creating schema
//A mongoose schema defines the structure of the document,
//default values,validators etc.
const playlistSchema=new mongoose.Schema({
    name :{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength:[2,"Minimum 2 letter char required"],
        maxlength:20
    },
    ctype:{
        type:String,
        required:true,
        lowercase:true,
        enum:["frontend","backend","database"]  //we can take only these values
    },
    videos:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("Videos count can not be negative");
            }
        }
    },
    author:String,
    email:{
       type:String,
       required:true,
       unique:true,
       validate(value){
         if(!validator.isEmail(value))
         throw new Error("email is not valid")
       }
    },
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})

//creating collection
//A mongoose model provides an interface to the database
//for creating querying,updating,deleting records etc.
const Playlist=new mongoose.model("Playlist",playlistSchema);

//create document or insert

// const mongoPlaylist=new Playlist({
//     name :"react",
//     ctype:"frontend",
//     videos:20,
//     author:"abhi",
//     active:true
// })
// mongoPlaylist.save();

//OR
const createDocument= async()=>{
    try{
        const mongoPlaylist=new Playlist({
            name :"bhailang",
            ctype:"database",
            videos:21,
            author:"abhi",
            email:"abhish@gmail.com",
            active:true
        })
        const result=await mongoPlaylist.save();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
createDocument();

// const createDocument= async()=>{
//     try{
//         const expressPlaylist=new Playlist({
//             name :"express",
//             ctype:"backend",
//             videos:20,
//             author:"abhi",
//             active:true
//         })
//         const JS=new Playlist({
//             name :"JS",
//             ctype:"Front",
//             videos:20,
//             author:"abhi",
//             active:true
//         })
//         const CSS=new Playlist({
//             name :"Css",
//             ctype:"style",
//             videos:20,
//             author:"abhi",
//             active:true
//         })
//         const result=await Playlist.insertMany([expressPlaylist,JS,CSS]);
//         console.log(result);
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// createDocument();

//to read the document
// const getDocument=async()=>{
//     try {
//         const result=await Playlist.find({ctype:"Database"}).select({name:1}).limit(1);
//         console.log(result); 
//     } catch (error) {
//         console.log(error)
//     }
    
// }
// getDocument();

//operator
// const getDocument=async()=>{
//     try {
//         const result=await Playlist
//         .find({ctype:{$in:["frontend","Database"]}})
//         .select({name:1});
//         console.log(result); 
//     } catch (error) {
//         console.log(error)
//     }   
// }
// getDocument();


//logical operator
// const getDocument=async()=>{
//     try {
//         const result=await Playlist
//         .find({author:"abhi"})
//         .select({name:1})
//         .sort({name:-1})  //1 means ascending order -1 means decending order
//         // .countDocuments();
//         console.log(result); 
//     } catch (error) {
//         console.log(error)
//     }   
// }
// getDocument();


//update document

// const updateDocument=async(_id)=>{
//     try {
//         const result=await Playlist.updateOne({_id},{
//             $set:{
//                 name:"Javascript",
//                 videos:10
//             }
//         })
//         console.log(result);
//     } catch (error) {
//         console.log(error)
//     }
// }
// updateDocument("6614d6019abddb78a0edc685");



//DELETE Document

const deleteDocument=async(_id)=>{
    try {
        // const result=await Playlist.findByIdAndDelete({_id})
        const result=await Playlist.deleteOne({_id})
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

//deleteDocument("6614d6019abddb78a0edc686");

