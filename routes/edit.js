const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
function loadDetails() {
    return fs.readFileSync("./data/details.json", "utf8");
}

router.get("/:id",(req,res)=>{
    const details= JSON.parse(loadDetails());
     const foundDetailIndex=details.findIndex((information)=>{  
                
         return information.id == req.params.id; 
     });
     console.log("this is details",foundDetailIndex);
     res.json(details[foundDetailIndex]);
 });

router.put("/:id", (req, res) => {
    const details = JSON.parse(loadDetails());
    const foundDetailIndex = details.findIndex((information) => {
        return information.id === req.params.id;
    });
    
    details[foundDetailIndex].name = req.body.name || details[foundDetailIndex].name;   
     details[foundDetailIndex].password = req.body.password || details[foundDetailIndex].password;
     details[foundDetailIndex].category = req.body.category || details[foundDetailIndex].category;
     details[foundDetailIndex].date = req.body.date || details[foundDetailIndex].date;
     details[foundDetailIndex].days = req.body.days || details[foundDetailIndex].days;
    details[foundDetailIndex].amount = req.body.amount || details[foundDetailIndex].amount;


    fs.writeFileSync('./data/details.json', JSON.stringify(details));
    res.json({
        message: 'updated file',
        posted: details,
    });
});

router.delete('/delete/:id', (req, res) => {
    const details= JSON.parse(loadDetails());
    const foundDetailIndex=details.findIndex((information)=>{  
              
        return information.id == req.params.id; 
    });
    details.splice(foundDetailIndex, 1);
    fs.writeFileSync('./data/details.json', JSON.stringify(details));
    res.json(details);
});

// router.get('/:id', (req, res) => {
//     if(res.body.name==='anshu'&& res.body.password==='1234')
//     { 
//        const details= JSON.parse(loadDetails());
//        const mappedDetails = details.map((information) => {
//            return {
//              id: information.id,
//             name:information.name,
//             category:information.category,
//             date:information.date,
//             days:information.days,
//             amount:information.amount,                                
//            };
//          });
//        res.json(mappedDetails);
//          }
  
//        fs.writeFileSync('./data/details.json', JSON.stringify(details));
//        res.json({
//            message: 'updated file',
//            posted: details,
//        });
//    });


module.exports = router;