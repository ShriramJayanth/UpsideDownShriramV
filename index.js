const express=require("express");
const fs=require("fs");
const bodyparser=require("body-parser");
const exec=require("child_process").exec;
const app=express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.listen(3000,function(){
    console.log("started");
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    fs.readFile(__dirname+"/index.html",'utf-8',function(err, data) {
        var mfile=data.toString();
        var start='<textarea name="text" id="input" contenteditable="true">';
        var startindex=mfile.indexOf(start)+start.length;
        var end='</textarea>';
        var endindex=mfile.indexOf(end);
        var finalcut=mfile.substring(0,startindex)+req.body.text+mfile.substring(endindex,mfile.length);
        fs.writeFile(__dirname+"/index.html",finalcut,(err)=>{
            if(err) throw err;
            console.log("success");
        })
        
      });
    fs.writeFile("sample.py",req.body.text,(err)=>{
        if(err) throw err;
        console.log("file has been saved");
    })
    try{
    exec("python3 sample.py",(e,stdout,stderr)=>{
        console.log("stdout",stdout);
        console.log("stderr",stderr);
        if(stdout.length!=0){
        let result = stdout.replaceAll("\n", "<br>");   
        fs.readFile(__dirname+"/index.html",'utf-8',function(err, data) {
            var mfile=data.toString();
            var koh='<section class="output">';
            var koh1=mfile.indexOf(koh)+koh.length;
            var li='</section>';
            var li1=mfile.indexOf(li);
            let result = stdout.replaceAll("\n", "<br>");  
            var kohli=mfile.substring(0,koh1)+result+mfile.substring(li1,mfile.length);
            fs.writeFile(__dirname+"/index.html",kohli,(err)=>{
                if(err) throw err;
                console.log("success");
            })
            
          });
        
        
        }
        else{
            fs.readFile(__dirname+"/index.html",'utf-8',function(err, data) {
                var mfile=data.toString();
                var koh='<section class="output">';
                var koh1=mfile.indexOf(koh)+koh.length;
                var li='</section>';
                var li1=mfile.indexOf(li);
                var kohli=mfile.substring(0,koh1)+"there is an error in the program"+mfile.substring(li1,mfile.length);
                fs.writeFile(__dirname+"/index.html",kohli,(err)=>{
                    if(err) throw err;
                    console.log("success");
                })
                
              });
        }
        })
        }
    catch{
        console.log("there is an error in the program");
    };
    setTimeout(function(){res.sendFile(__dirname+"/index.html");},100);
});

app.post("/run",function(req,res){
    fs.writeFile("sample.py",req.body.text,(err)=>{
        console.log("file has been saved");
    })
    exec("python3 sample.py",(e,stdout,stderr)=>{
        console.log("stdout",stdout);
        console.log("stderr",stderr);
    });


})
