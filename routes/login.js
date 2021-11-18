const express = require("express");
 const router = express.Router();
const fs = require("fs");

function loadLogDetails(){
    return fs.readFileSync("./data/details.json","utf8");
 }
 

router.post("/",(req,res)=>{
    const details= JSON.parse(loadLogDetails());
     const foundDetailIndex=details.findIndex((information)=>{  
                 
         return information.password=== req.body.password; 
      
     });
     console.log("this is foundindex",foundDetailIndex);
     if(foundDetailIndex===-1){
        return res.status(400).send({
            message: 'This is an error!'
         });
     }    
     res.json(details[foundDetailIndex]);
    
  
 });

 

module.exports=router;