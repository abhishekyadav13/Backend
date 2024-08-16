const http=require("http");
const fs=require("fs");
const requests=require("requests");

const homeFile=fs.readFileSync("home.html","utf-8");
const cssFile = fs.readFileSync("index.css", "utf-8");

const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
     temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
     temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
     temperature=temperature.replace("{%location%}",orgVal.name);
     temperature=temperature.replace("{%country%}",orgVal.sys.country);
     temperature=temperature.replace("{%tempStatus%}",orgVal.weather[0].main);
     return temperature;
}



const server=http.createServer((req,res)=>{
    if(req.url=="/"){
      requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=bccd6820b3005fffcaaf2ecb1422b0fd")
      .on("data",(chunk)=>{
        const objdata=JSON.parse(chunk)
        // const realTimeData = replaceVal(homeFile, objdata);
        const arrData=[objdata];
        // console.log(arrData[0].main.temp)
        const realTimeData=arrData.map((val)=>
            // console.log(val.main);
           replaceVal(homeFile,val)
).join("");
        res.write(realTimeData)
        res.end();
        // console.log(realTimeData);
      })
      .on("end",(err)=>{
        if(err)
        return console.log("connection closed",err);
        res.end();
        // console.log("end");
      })
      
    }
    else if(req.url === "/index.css") { // Handle requests for index.css
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(cssFile);
        res.end();
      }

      else{
        res.end();
      }
})

server.listen(8000,"127.0.0.1");



