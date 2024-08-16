
const fs=require("fs")
const http=require("http")

const server=http.createServer((req,res)=>{
    //console.log(req.url)

    const data=fs.readFileSync(`${__dirname}/UserAPI/userapi.json`,"utf-8")
    console.log(data);
    const orgData=JSON.parse(data)

    if(req.url=="/"){
        res.end("hello from home side this is abhi")
    }
    else if(req.url=="/about"){
        res.end("hello from about side this is abhi")
    }
    else if(req.url=="/userapi"){
        // fs.readFile(`${__dirname}/UserAPI/userapi.json`,"utf-8",(err,data)=>{
        //  console.log(data);
        //  const orgData=JSON.parse(data)
         res.writeHead(200,{"content-type":"application/json"})
         res.end(orgData[0].relationships.author.data.id)
        }
        
    
    else{
        res.writeHead(404,{"Content-type":"text:html"});
        res.end("404 error found")
    }
    
})

server.listen(8000,"127.0.0.1", ()=>{
    console.log("listening to the port 8000");
})
