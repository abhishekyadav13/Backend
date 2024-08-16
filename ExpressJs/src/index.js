
// const express=require("express");
// const app=express();
// const path=require("path");

// //console.log(__dirname);
// const staticPath=path.join(__dirname,"../public");
// //builtin middleware
// app.use(express.static(staticPath));

// app.get("/",(req,res)=>{
//     res.send("hello from home page")
// })
// app.get("/about",(req,res)=>{
//     res.send("hello from about page")
// })

// app.listen("8000",()=>{
//     console.log("listening to port 8000");
// })




// const express=require("express");
// const app=express();
// const path=require("path");

 // const staticPath=path.join(__dirname,"../public");
// app.use(express.static(staticPath));


// app.get("/",(req,res)=>{
//     res.send("hello from home page")
// })

// app.listen("8000",()=>{
//     console.log("listening to port 8000");
// })




const express = require("express");
const app = express();
const path = require("path");
const hbs=require("hbs");
const requests=require("requests")

// Set views directory
app.set('views', path.join(__dirname, '../templates/views'));
const partialPath= path.join(__dirname, '../templates/partial');
// Set view engine to handlebars
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

// Define route to render index view
app.get("/", (req, res) => {
    res.render("index",{
        channel:"abhi"
    });
});
app.get("/about", (req, res) => {
    //res.render("about");
    requests(`https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=bccd6820b3005fffcaaf2ecb1422b0fd`)
      .on("data",(chunk)=>{
        const objdata=JSON.parse(chunk)
        const arrData=[objdata];
        console.log(`city name is ${arrData[0].name} and the temp is ${arrData[0].main.temp}`);
        res.write(arrData[0].name)
        // res.end();
        // console.log(realTimeData);
      })
      .on("end",(err)=>{
        if(err)
        return console.log("connection closed",err);
        res.end();
        // console.log("end");
      })
      
});

// app.get("/", (req, res) => {
//     res.send("welcome");
// });

app.get("/about/*",(req,res)=>{
    res.render("404",{
        errorFound:"Could not found the about page"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        errorFound:"Could not found the page"
    })
})

// Start the server
app.listen(8000, () => {
    console.log("Listening on port 8000");
});

