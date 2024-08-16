const fs=require("fs")

const bioData={
    name:"abhishek",
    age:22,
    city:"ahmd",
    fun:function(){
        console.log("hello")
    }
}

// console.log(bioData)
const json=JSON.stringify(bioData)
// console.log(json)
// const obj=JSON.parse(json)
// console.log(obj)

// fs.writeFile("json1.json",json,(err)=>{
//     console.log("done")
// })

fs.readFile("json1.json","utf-8",(err,data)=>{
    const orgData=JSON.parse(data)
    console.log(data);
    console.log(orgData);
})