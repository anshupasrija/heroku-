const express = require("express");
 const router = express.Router();
const fs = require("fs");
const {v4:uuidv4}=require('uuid');
function loadDetails(){
    return fs.readFileSync("./data/details.json","utf8");
 }

 router.post("/",(req,res)=>{
     if(req.body.email==='' && req.body.category==='' && req.body.password===''){
         res.status(422).send('Please enter your email and category');
     }
     else{
        const postDetails= JSON.parse(loadDetails());
        const newDetails={
            id: uuidv4(),
            name: req.body.name,
            password:req.body.password,                  
            category: req.body.category,  
            date:req.body.date,  
            days: req.body.days, 
            amount:req.body.amount,   
               
        };
        postDetails.push(newDetails);
        fs.writeFileSync('./data/details.json', JSON.stringify(postDetails));
        res.json({
            message: 'posted to products endpoint',
            posted: newDetails,
        });
     }
  
 })

    
 

module.exports=router;