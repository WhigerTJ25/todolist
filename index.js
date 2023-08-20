import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname=dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// app.use("/css",express.static(__dirname+"node_modules/bootstrap/dist/css"));
// app.use(express.static(__dirname+"node_modules/bootstrap/dist/js"));
let newTask=[];

function new_Task(req,res,next){
    const newItem=req.body["newItem"];
    if(newItem){
        newTask.push(newItem);
    }

next();
}
app.use(new_Task);

app.get("/",(req,res)=>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const d = new Date();

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    res.render("index.ejs",{
        mon:month,
        dy:day,
        nt:newTask,

        
    });
})

app.get("/week",(req,res)=>{
    res.render("week.ejs",{
        nt:newTask,
    });
})


app.post("/submit",(req,res)=>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const d = new Date();

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    res.render("index.ejs",{
        mon:month,
        dy:day,
        nt:newTask,

        
    });

})
// app.post("")


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
