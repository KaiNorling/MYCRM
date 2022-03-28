const { HomeGetC } = require("../../controllers/HomeRC");


const HomeR = require("express").Router();  

HomeR.get("/", HomeGetC )



module.exports=HomeR;