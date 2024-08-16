const EventEmitter=require("events")
const event=new EventEmitter();

// event.on("sayMyName",()=>{
//     console.log("my name is abhi")
// })
// event.on("sayMyName",()=>{
//     console.log("my name is kumar")
// })
// event.on("sayMyName",()=>{
//     console.log("my name is yadav")
// })

// event.emit("sayMyName")


event.on("checkPage",(sc,msg)=>{
    console.log(`code is ${sc} and msg is ${msg}`)
})

event.emit("checkPage",200,"ok")