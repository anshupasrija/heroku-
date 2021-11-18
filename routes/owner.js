const express = require("express");
 const router = express.Router();
const fs = require("fs");

function loadDetails(){
    return fs.readFileSync("./data/details.json","utf8");
 }

 router.get('/', (req, res) => {
   
        const details= JSON.parse(loadDetails());
        const mappedDetails = details.map((information) => {
            return {
              id: information.id,
             name:information.name,
             category:information.category,
             date:information.date,
             days:information.days,
             amount:information.amount,                                
            };
          });
        res.json(mappedDetails);
        
       
    });

 





module.exports=router;